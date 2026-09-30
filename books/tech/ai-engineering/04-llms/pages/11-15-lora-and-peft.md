## LoRA and PEFT

- If page 11-14 said "fine-tune," this page is *how*, cheaply. **PEFT (parameter-efficient fine-tuning)** trains a small number of new parameters and freezes the rest — the practical way to adapt a large model without a data-centre.
- **LoRA** (the low-rank adapters from page 10-15) is the dominant PEFT method. The family:

<svg viewBox="0 0 322 66" role="img" aria-label="PEFT methods: LoRA adapters, QLoRA on a 4-bit base, and prompt tuning of soft tokens, all far smaller than full fine-tuning" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="10" width="100" height="46" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="56" y="24" text-anchor="middle" font-size="8" fill="#24405e">LoRA</text><text x="56" y="37" text-anchor="middle">adapters, 16-bit base</text><text x="56" y="48" text-anchor="middle" fill="#6b6b6b">&lt;1% params</text>
  <rect x="112" y="10" width="100" height="46" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="162" y="24" text-anchor="middle" font-size="8" fill="#24405e">QLoRA</text><text x="162" y="37" text-anchor="middle">adapters, 4-bit base</text><text x="162" y="48" text-anchor="middle" fill="#6b6b6b">one GPU</text>
  <rect x="218" y="10" width="100" height="46" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="268" y="24" text-anchor="middle" font-size="8" fill="#24405e">prompt tuning</text><text x="268" y="37" text-anchor="middle">learn soft tokens</text><text x="268" y="48" text-anchor="middle" fill="#6b6b6b">tiny, weak</text>
</svg>

- **Full fine-tuning** updates every weight — highest quality, but needs the memory to hold weights + gradients + optimizer state (roughly 4× the model). Rarely worth it outside labs.
- **LoRA / QLoRA** — train adapters; get ~full-fine-tune quality at a fraction of the cost. The default.
- **Prompt / prefix tuning** — learn a few "soft" prompt vectors, freeze everything else. Smallest footprint, but weaker; niche.
- **Deployment**: keep adapters separate and **hot-swap** many tasks onto one base model, or **merge** an adapter into the weights for zero inference overhead. Tools: Hugging Face **PEFT**, **Axolotl**, **Unsloth**.

:::warn
LoRA is cheap to run and cheap to overfit. Too high a rank, too few examples, or too many epochs and it memorises your tiny dataset and forgets general ability (**catastrophic forgetting**). Start with a low rank (8–16), a small learning rate, and one to three epochs — then evaluate before turning anything up.
:::
