## Running SGLang

- The backend launches like vLLM's — an OpenAI-compatible server, one command. Verified against SGLang's server-arguments docs.

:::mint
```bash
# pip install "sglang[all]"
python -m sglang.launch_server \
  --model-path meta-llama/Llama-3.1-70B-Instruct \
  --tp 2 \                       # tensor parallelism degree
  --mem-fraction-static 0.85 \   # VRAM fraction for weights + KV pool
  --port 30000
# RadixAttention prefix caching is on by default
```
:::

- The **frontend language** is SGLang's second half: express a branching, multi-call program and let the runtime batch and prefix-share it automatically.

:::mint
```python
import sglang as sgl

@sgl.function
def route(s, question):
    s += sgl.system("You are a support router.")
    s += sgl.user(question)
    s += "Category: " + sgl.gen("cat", choices=["billing", "tech", "other"])
    if s["cat"] == "tech":                 # branch on the model's own output
        s += sgl.assistant(sgl.gen("answer", max_tokens=256))

state = route.run(question="my GPU pod keeps OOM-ing")
print(state["cat"], state["answer"])
```
:::

- `sgl.gen(..., choices=[...])` constrains the output to a set (structured decoding); `sgl.fork` runs parallel branches that share their common prefix in the cache. The DSL and RadixAttention are designed together — branches fork off one cached context instead of re-sending it.

:::note
`--mem-fraction-static` is SGLang's equivalent of vLLM's `--gpu-memory-utilization`: the slice of VRAM reserved for weights plus the KV pool. Same failure mode — too high OOMs the box, too low starves the cache and caps concurrency. If you have internalised the vLLM knobs, SGLang's map onto them almost one-to-one; only the names differ.
:::
