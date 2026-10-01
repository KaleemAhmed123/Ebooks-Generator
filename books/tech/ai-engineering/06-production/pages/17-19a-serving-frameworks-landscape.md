## The wider serving landscape

- vLLM, SGLang, and TensorRT-LLM are the throughput leaders, but the full serving landscape has more names, and knowing where each fits saves you from reaching for the wrong tool. **[VERIFY current status]**

| Tool | Niche |
|---|---|
| **vLLM** | general-purpose default, broadest support |
| **SGLang** | prefix-heavy (agents, RAG), structured programs |
| **TensorRT-LLM** | peak on NVIDIA, compiled engines |
| **TGI** (HF) | HF-integrated; now maintenance-mode, points to vLLM/SGLang |
| **Triton Inference Server** | NVIDIA's multi-model/multi-framework server (often fronts TRT-LLM) |
| **Ray Serve** | serving inside a larger Ray pipeline |
| **Ollama / llama.cpp** | local/desktop, GGUF, edge (17-36) |
| **LMDeploy, MLC-LLM** | other engines (MLC for cross-platform/edge) |

- **The consolidation story.** vLLM and SGLang have become the open-source production default (~80% of self-hosted inference), TensorRT-LLM owns peak NVIDIA performance, and **TGI** — once the default — is now maintenance-mode, with Hugging Face pointing users to vLLM/SGLang. Knowing TGI is no longer the pick is itself a currency signal (things move fast).
- **Triton vs an engine.** People confuse them: **Triton Inference Server** is a *serving server* (routing, multi-model, metrics) that often *hosts* a TensorRT-LLM engine — they're layers, not competitors. Similarly Ray Serve is orchestration around an engine, and Ollama/llama.cpp are the *local/edge* tier, not datacenter serving.

:::note
The landscape has layers, and the interview mistake is treating them as one list of competitors. **Engines** (vLLM, SGLang, TensorRT-LLM, llama.cpp) do the actual inference. **Servers/orchestrators** (Triton, Ray Serve, the vLLM production stack) route, scale, and observe around an engine. **Local runtimes** (Ollama, MLC) target the edge/desktop tier. A production stack is usually *an engine inside a server on Kubernetes* — e.g. TensorRT-LLM inside Triton, or vLLM behind the production stack's router. Placing a tool in the right layer, and knowing the vLLM/SGLang consolidation (and TGI's decline), is what current serving literacy looks like.
:::
