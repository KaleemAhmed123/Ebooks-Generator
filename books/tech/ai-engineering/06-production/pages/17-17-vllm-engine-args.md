## The vLLM knobs that matter

- Most engine args are defaults you never touch. A handful decide whether you hit your SLO. **[VERIFY current names/defaults]**

| Arg | Controls | Tune when |
|---|---|---|
| `--tensor-parallel-size` | GPUs per model copy | weights exceed one card |
| `--gpu-memory-utilization` | VRAM claimed for weights + KV | OOM crashes, or KV starved |
| `--max-num-seqs` | max concurrent sequences | throughput vs per-user latency |
| `--max-num-batched-tokens` | tokens per forward pass | TTFT smoothness vs prefill speed |
| `--max-model-len` | admitted context length | long-context vs KV budget |
| `--quantization` | weight format (fp8, awq, gptq…) | fit a bigger model, cut cost |
| `--enable-prefix-caching` | reuse shared-prefix KV | many requests share a prompt |

- **Prefix caching** keeps the KV blocks for a shared prompt prefix (system prompt, few-shot block, a document) across requests, so repeated prefixes skip prefill. In the current V1 engine it is on by default; older versions need the flag. **[VERIFY]**
- **Data parallelism** (`--data-parallel-size`) runs several full model replicas for throughput; combine with tensor parallelism (`DP × TP`) to fill a multi-GPU node — e.g. `--data-parallel-size 4 --tensor-parallel-size 2` on 8 GPUs.

:::interview
"You're at your latency SLO but throughput is too low. What do you change?"

Raise `--max-num-seqs` and `--max-num-batched-tokens` to pack more work per pass — but watch TPOT, because a fuller batch slows each user's per-token latency. If you hit a memory wall first, the real lever is **quantisation** (free KV headroom) or **more replicas** (`--data-parallel-size`). Naming the memory-vs-latency-vs-throughput triangle, not one magic flag, is the signal.
:::
