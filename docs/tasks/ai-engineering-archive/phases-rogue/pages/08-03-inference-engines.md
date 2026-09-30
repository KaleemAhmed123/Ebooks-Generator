# AI Engineering: From Scratch

## High-Performance Inference Engines

A naive PyTorch loop generating tokens for 100 users simultaneously would stall the GPU. To serve LLMs in production, you use a dedicated Inference Engine like **vLLM** or **TensorRT-LLM**.

### The Three Pillars of vLLM

Serving engines rely on three compounding optimizations:
1. **PagedAttention:** A naive KV cache forces you to pre-allocate massive contiguous blocks of memory for every request, wasting up to 80% of VRAM due to fragmentation. PagedAttention borrows from OS virtual memory, allocating KV cache in small, 16-token non-contiguous blocks. Waste drops to 4%.
2. **Continuous Batching:** Old systems waited for a batch to fill, processed it, and waited for the slowest sequence to finish. Continuous batching ejects finished requests and injects new requests *at every single token generation step*, keeping the GPU perfectly saturated.
3. **Chunked Prefill:** Processing a massive 32K token prompt ties up the GPU for a full second. Chunked Prefill chops that prompt into 512-token chunks, interleaving them with token generation for other users, ensuring no single user blocks the system.
