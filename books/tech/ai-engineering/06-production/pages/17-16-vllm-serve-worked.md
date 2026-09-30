## Serving a model with vLLM

- One command turns a Hugging Face model into a production OpenAI-compatible endpoint. Verified against the vLLM stable serving docs. **[VERIFY current flags]**

:::mint
```bash
# pip install vllm
vllm serve meta-llama/Llama-3.1-70B-Instruct \
  --tensor-parallel-size 2 \       # split the model across 2 GPUs
  --max-model-len 8192 \           # context window to admit
  --gpu-memory-utilization 0.90 \  # fraction of VRAM for weights + KV
  --max-num-seqs 256 \             # concurrency cap
  --port 8000
# serves /v1/chat/completions and /v1/completions
```
:::

- The server speaks the OpenAI wire format, so any OpenAI client works by changing the base URL:

:::mint
```python
from openai import OpenAI
client = OpenAI(base_url="http://localhost:8000/v1", api_key="none")
r = client.chat.completions.create(
    model="meta-llama/Llama-3.1-70B-Instruct",
    messages=[{"role": "user", "content": "Explain goodput in one line."}],
)
print(r.choices[0].message.content)
```
:::

- **Tensor parallelism** (`--tensor-parallel-size`) shards each layer across GPUs — required when weights exceed one card. Use it to *fit* a model, not to speed a model that already fits (the cross-GPU communication is pure overhead below that threshold).
- The endpoint streams tokens (`stream=True`), supports structured/guided decoding, and exposes Prometheus metrics at `/metrics` — the hooks the observability cluster (17-45) consumes.

:::warn
`--gpu-memory-utilization 0.90` means vLLM claims 90% of VRAM at startup for weights **and** the KV-cache pool. Set it too high and other processes (or a second model) OOM the box; too low and you starve the KV cache, capping concurrency. On a shared GPU, this single number is the most common cause of mysterious out-of-memory crashes.
:::
