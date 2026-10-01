## Post-training quantization vs quantization-aware training — when each?

- **Post-training quantization (PTQ):** take a trained model and quantize it directly, using a small **calibration** set to pick good scales. Cheap, fast, no retraining — the default for deploying LLMs. GPTQ and AWQ are PTQ methods.
- **Quantization-aware training (QAT):** simulate quantization *during* training/fine-tuning so the model learns weights robust to the precision loss. More expensive, needs the training pipeline, but recovers more accuracy at very low bit-widths.
- Rule of thumb:
  - **PTQ** for 8-bit and most 4-bit LLM serving — the accuracy hit is small and the cost is near zero.
  - **QAT** when you push to very low bits (≤4 or 2-bit) and PTQ's accuracy drop is unacceptable, or for small edge models where every point matters.
- For most AI engineers deploying open models, **PTQ (AWQ/GPTQ) is the answer**; QAT is a specialist move.

:::interview
**What's really being tested:** that PTQ is cheap/default and QAT buys back accuracy at low bit-widths for a training cost — and that you'd reach for PTQ first.
:::
