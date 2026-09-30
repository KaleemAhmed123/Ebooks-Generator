## Building a TensorRT-LLM engine

- The workflow is three steps: **quantise** the checkpoint, **build** the engine, **serve** it. Verified against NVIDIA's TensorRT-LLM docs. **[VERIFY current commands]**

:::mint
```bash
# 1) quantise HF weights to FP8 (with FP8 KV cache), sharded for 2-GPU TP
python examples/.../quantization/quantize.py \
  --model_dir  meta-llama/Meta-Llama-3-70B \
  --dtype bfloat16 --qformat fp8 --kv_cache_dtype fp8 \
  --output_dir /tmp/llama70b/ckpt --tp_size 2

# 2) compile the checkpoint into a hardware-specific engine
trtllm-build --checkpoint_dir /tmp/llama70b/ckpt \
  --gemm_plugin fp8 --output_dir /tmp/llama70b/engine \
  --max_batch_size 256 --max_seq_len 8192 --workers 2

# 3) serve it, OpenAI-compatible
trtllm-serve /tmp/llama70b/engine --tp_size 2 --port 8000
```
:::

- The **shape parameters** (`--max_batch_size`, `--max_seq_len`) are baked into the engine — they define the space the compiler optimises for. Pick them from your real traffic; too small and large requests are rejected, too large and you waste optimisation budget on shapes you never serve.
- For a pre-quantised model you skip step 1 and can load directly via the `LLM` API: `LLM(model="nvidia/Llama-3.1-8B-Instruct-FP8")`.

:::warn
The build step is slow (minutes, sometimes longer for big models) and produces an artefact tied to the **exact** GPU architecture, TensorRT version, and precision. Upgrade the driver, move from H100 to H200, or bump the library, and the cached engine may be invalid — you rebuild. Bake engine builds into CI and version the artefacts, or a routine infra upgrade silently breaks serving. This is the operational tax vLLM does not charge.
:::
