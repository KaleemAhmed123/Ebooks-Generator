## Production quantization

- Booklet 4 covered *what* quantisation is — storing weights in fewer bits. Here it is a **serving lever**: lower precision shrinks the weights *and* the KV cache, which frees the memory that caps concurrency (page 17-11) and cuts the memory bandwidth that bounds decode. It is the highest-leverage single change for serving cost.

| Format | Bits | Where it wins | Note |
|---|---|---|---|
| **FP8** | 8 | H100/H200/Blackwell native | near-lossless, the current default |
| **INT4 / AWQ / GPTQ** | 4 | fit a big model on a small GPU | needs quality eval |
| **FP4** | 4 | Blackwell native (17-26) | mixed-precision in practice |
| **KV-cache quant** | 8/4 | long context, high concurrency | shrinks the cache itself |

- **FP8** is the modern default: on hardware with native FP8 tensor cores it is close to lossless and roughly halves memory versus FP16, so it is the first thing you turn on. Enable it at serve time (`--quantization fp8`) or serve a pre-quantised checkpoint.
- **AWQ** (Activation-aware Weight Quantization) and **GPTQ** are 4-bit *weight-only* schemes: they protect the weights that matter most to activations, so 4-bit models keep most of their quality. They are how you fit a 70B on a single 48 GB card.
- **KV-cache quantisation** is separate and underused: storing the cache in FP8/INT8 shrinks the exact resource that limits concurrency, often for negligible quality loss.

:::warn
Benchmark quality is not *your* quality. A 4-bit model can score fine on MMLU and still degrade on your domain — long-context recall, code, JSON adherence, and non-English tend to suffer first. Never ship a quantised model on the vendor's benchmark; run *your* eval suite (Module 18's methods) on the quantised weights and compare to full precision before it touches production.
:::
