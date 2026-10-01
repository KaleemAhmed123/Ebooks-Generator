## Fine-tuning: DPO from scratch

- **DPO** (Direct Preference Optimization, Booklet 4) aligns the model on preference pairs `(prompt, chosen, rejected)` *without* a separate reward model or RL — it optimises the model directly to prefer chosen over rejected, relative to a frozen reference copy. The loss, in full:

:::mint
```python
import torch.nn.functional as F

def dpo_loss(policy_logps, ref_logps, beta=0.1):
    # each arg: (chosen_logp, rejected_logp) summed over response tokens
    pol_chosen, pol_reject = policy_logps
    ref_chosen, ref_reject = ref_logps
    # how much MORE the policy prefers chosen vs rejected, vs the reference
    pol_diff = pol_chosen - pol_reject
    ref_diff = ref_chosen - ref_reject
    logits = beta * (pol_diff - ref_diff)
    return -F.logsigmoid(logits).mean()      # push the margin positive
```
:::

- **What it does.** `pol_diff − ref_diff` is how much *more* the trained policy prefers the chosen response than the frozen reference did. `logsigmoid` turns "make this margin large and positive" into a loss. The model learns to increase the gap between good and bad responses, anchored so it does not drift far from the reference.
- **`beta` is the leash.** It controls how far the policy may move from the reference model — small `beta` allows big changes (more alignment, more risk of degradation), large `beta` keeps it close (safe, less effect). This is the KL constraint of RLHF, folded into one hyperparameter (the reference-model term is what enforces it).

:::note
DPO's elegance is that it collapses RLHF's three moving parts (reward model + RL loop + KL penalty) into one supervised-style loss on preference pairs — no reward model to train, no unstable PPO loop. That is why it became the default alignment method for open models. The failure modes are the ones from Booklet 4 (18-04): likelihood displacement (pushing down "rejected" can drop nearby good responses) and length bias, both invisible on the preference metric — so, as always, you evaluate the DPO'd model on a *broad held-out suite*, not just its preference win-rate.
:::
