## Fine-tuning: eval and defense

- A fine-tune is not done when the loss drops — it is done when it is *better on what you care about and not worse on everything else.* The eval must measure both.

| Eval | Catches |
|---|---|
| **task metric** (your held-out set) | did it improve at the target task? |
| **general-capability suite** (MMLU-style) | catastrophic forgetting (19-26) |
| **preference win-rate** (vs the pre-DPO model) | did alignment help? |
| **safety/refusal eval** | did fine-tuning break safety? |
| **length/format checks** | DPO length bias, format drift |

- **The order of operations for a full pipeline:** SFT on demonstrations → evaluate → DPO on preferences → evaluate again → safety eval → ship. Evaluate *between* stages, not just at the end, so you know which stage caused a regression. And keep the base and SFT checkpoints — you will want to roll back to them.
- **Production reality:** most teams do LoRA-SFT + DPO, not full fine-tuning — cheaper, faster, and it yields swappable adapters. Full fine-tuning is reserved for when LoRA measurably underperforms on the task.

:::interview
"Walk me through fine-tuning a base model into a safe assistant."

Two stages plus guardrails. **SFT** on `(instruction, response)` demonstrations, *masking the prompt* so it learns to respond — this gives format and instruction-following. **DPO** on `(chosen, rejected)` preference pairs to align quality and tone, with `beta` controlling drift from the reference. Throughout: LR warmup+cosine, gradient clipping/accumulation, AMP, checkpoint-with-optimiser-state, FSDP if it doesn't fit one GPU. Then the part candidates skip: **evaluate between stages** on the task, a *general* suite (catch forgetting), preference win-rate, and *safety/refusal* — because fine-tuning can silently break the base model's safety. Naming loss-masking, the SFT→DPO order, and the safety-regression check is the complete answer.
:::
