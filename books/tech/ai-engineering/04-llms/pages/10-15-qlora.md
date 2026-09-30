## QLoRA

- Full fine-tuning updates every weight — for a 70B model, impossible on one GPU. **LoRA (low-rank adaptation)** freezes the original weights and trains a tiny pair of extra matrices beside each big one. **QLoRA** adds one more saving: the frozen base is stored in 4-bit.
- **LoRA in one line**: a weight update `ΔW` is approximated as the product of two small matrices `A·B`. Instead of training a `d×d` matrix, you train `d×r` and `r×d` with rank `r`≈8–64 — often <1% of the parameters.

:::mint
```
output = W·x  +  (A·B)·x
         └frozen┘  └ trainable, tiny ┘     r ≪ d
QLoRA:  W kept in 4-bit (NF4);  A,B trained in 16-bit
```
:::

<svg viewBox="0 0 300 60" role="img" aria-label="A large frozen 4-bit weight matrix sits beside two small trainable low-rank matrices" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="20" y="10" width="40" height="40" fill="#cfe3f5" stroke="#24405e"/><text x="40" y="33" text-anchor="middle" font-size="7">W 4-bit</text><text x="40" y="58" text-anchor="middle" font-size="6" fill="#6b6b6b">frozen</text>
  <text x="78" y="33">+</text>
  <rect x="96" y="10" width="12" height="40" fill="#1a3a2a"/><rect x="112" y="10" width="40" height="12" fill="#1a3a2a"/>
  <text x="130" y="42" text-anchor="middle" font-size="7" fill="#1a3a2a">A·B trained</text>
  <text x="230" y="33" text-anchor="middle" fill="#c0392b" font-size="7">tune a 70B model</text><text x="230" y="45" text-anchor="middle" fill="#c0392b" font-size="7">on one 48GB GPU</text>
</svg>

- QLoRA's headline result (2023): fine-tune a 65B model on a **single 48 GB GPU** with no quality loss versus 16-bit LoRA — via 4-bit **NF4** storage, double quantization, and paged optimizer memory.
- Adapters are small (megabytes). You can keep many task-specific adapters and swap them onto one base model, or merge an adapter back into the weights for deployment.

:::warn
QLoRA trains adapters *on top of* a 4-bit base — the base's quantization error is still there, so it slightly trails full 16-bit fine-tuning on the hardest tasks. And a high LoRA rank on too little data still overfits. It is the cheap, excellent default for adapting open models — not a free lunch for frontier-quality training.
:::
