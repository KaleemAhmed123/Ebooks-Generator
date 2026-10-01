## What is teacher forcing, and what is the exposure bias it causes?

- **Teacher forcing** trains a generator by feeding the **ground-truth** previous tokens as context for predicting the next one — not the model's own predictions. It's fast (fully parallel with causal masking) and stable.
- The mismatch — **exposure bias**: at training the model always sees *correct* history; at inference it sees its *own* (sometimes wrong) history. One early mistake shifts it into a context it never trained on, and errors compound.
- Symptoms: generations that drift, repeat, or derail after a wrong turn, especially on long outputs.
- Mitigations: scheduled sampling (occasionally feed the model's own tokens during training), sequence-level objectives, and — the modern answer — RLHF/DPO, which train on the model's *own* generations and so directly reduce the gap.

:::interview
What's really being tested:

that you can name the train/inference distribution mismatch (ground-truth vs self-generated history) and connect compounding errors to why we post-train on model outputs.
:::
