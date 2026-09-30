## What quantization is

- A model's weights are numbers. Trained in **FP16/BF16** — 16 bits each — a 70-billion-parameter model needs ~140 GB just to hold its weights. **Quantization** stores each weight in fewer bits, shrinking the model so it fits on cheaper hardware and runs faster.
- The idea: map high-precision values to a small grid of low-precision ones. 16 bits → 8 bits halves the size; 16 → 4 bits quarters it.

:::mint
```
FP16 weight:  0.7314  →  INT4 (16 levels): nearest grid point
memory for 70B params:
  FP16  ≈ 140 GB   (needs 2× A100-80GB)
  INT8  ≈  70 GB
  INT4  ≈  35 GB   (fits one 48 GB GPU)
```
:::

<svg viewBox="0 0 316 56" role="img" aria-label="Continuous weights snap to a few discrete levels; fewer bits means fewer levels and coarser rounding" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <line x1="16" y1="20" x2="300" y2="20" stroke="#24405e"/>
  <g fill="#c0392b"><circle cx="40" cy="20" r="2"/><circle cx="95" cy="20" r="2"/><circle cx="150" cy="20" r="2"/><circle cx="205" cy="20" r="2"/><circle cx="260" cy="20" r="2"/></g>
  <text x="16" y="34" font-size="7" fill="#6b6b6b">INT4 grid: 16 levels (coarse)</text>
  <line x1="16" y1="44" x2="300" y2="44" stroke="#1a3a2a"/>
  <g fill="#1a3a2a"><circle cx="30" cy="44" r="1.5"/><circle cx="55" cy="44" r="1.5"/><circle cx="80" cy="44" r="1.5"/><circle cx="105" cy="44" r="1.5"/><circle cx="130" cy="44" r="1.5"/><circle cx="155" cy="44" r="1.5"/><circle cx="180" cy="44" r="1.5"/><circle cx="205" cy="44" r="1.5"/><circle cx="230" cy="44" r="1.5"/><circle cx="255" cy="44" r="1.5"/><circle cx="280" cy="44" r="1.5"/></g>
  <text x="16" y="54" font-size="7" fill="#6b6b6b">INT8 grid: 256 levels (fine)</text>
</svg>

- The trade is **quality for size**. Rounding introduces error; too few bits and the model degrades. The engineering is in quantizing so the error barely moves outputs — usually FP16 → INT8 is near-free, INT4 is the practical floor for most tasks.

:::warn
Quality loss is not uniform. INT4 barely dents chat, but noticeably hurts math, code, and long reasoning — tasks where one wrong token derails the answer. Match the bit-width to the job: aggressive quantization for a chatbot, conservative for a coding or reasoning model.
:::
