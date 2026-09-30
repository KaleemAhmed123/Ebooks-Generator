# AI Engineering: From Scratch

## LLM Inference & Optimization

Training a Transformer is bounded by FLOPs (compute). Serving a Transformer (Inference) is bounded by memory bandwidth. Generating text autoregressively requires loading the entire model's weights into SRAM for every single token generated.

### The KV Cache

An autoregressive decoder takes $O(N^2)$ work to generate $N$ tokens. But the history of past tokens never changes! We solve this by caching the Keys (K) and Values (V) of every token we process. For the next step, we only compute the Query for the new token and run it against the cached Keys and Values. This reduces attention from $O(N^2)$ to $O(N)$ per generation step, though it consumes massive VRAM.

### Flash Attention

Standard attention computes an $N \times N$ matrix in the GPU's High-Bandwidth Memory (HBM). Moving this data back and forth to the chip is incredibly slow. **Flash Attention** tiles the matrix multiplication so it can be computed entirely in the ultra-fast SRAM without materializing the full matrix. It provides a 2x-4x speedup on modern GPUs.

### Speculative Decoding

A small, fast "draft" model guesses the next 5 tokens. The massive, slow main model evaluates all 5 tokens in a single parallel forward pass. If it agrees, we get 5 tokens for the price of 1 generation step.
