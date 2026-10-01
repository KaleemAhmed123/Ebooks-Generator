## Glossary: F – G

| Term | Means | In |
|---|---|---|
| **Forward pass** | running input through the network to produce an output | B2 |
| **Fourier transform** | rewriting a signal as a sum of waves of different frequencies | B1 |
| **FP4** | A 4-bit floating-point format with native tensor-core support on Blackwell, halving memory versus FP8; used mixed-precision in practice | B6 |
| **FP8** | an 8-bit floating-point format native to recent GPUs, giving better accuracy than INT8 at similar size | B4 · B6 |
| **Frontier Safety Framework (FSF)** | Google DeepMind's capability-gated safety framework with Critical Capability Levels | B5 |
| **FSDP (Fully Sharded Data Parallel)** | PyTorch's ZeRO-style training that shards parameters, gradients, and optimiser state across GPUs to fit models too big for one card | B6 |
| **FSDP / ZeRO** | techniques that shard weights, gradients, and optimizer state across data-parallel GPUs so no single GPU holds a full copy | B4 |
| **FSF (Frontier Safety Framework)** | DeepMind's safety framework defining Critical Capability Levels and required safeguards; v3.0 as of 2026 | B6 |
| **Full-duplex** | processing incoming and outgoing audio at once, so a system can listen while speaking | B2 |
| **function calling** | Mechanism where a model returns a structured tool-use block naming a tool and arguments, which your code executes | B5 |
| **fusion (multimodal)** | How a VLM joins vision and language: projector, query bottleneck, cross-attention, or shared tokens, from shallow to deep | B5 |
| **GAIA** | Benchmark of general-assistant tasks requiring reasoning, tools, and web use | B5 |
