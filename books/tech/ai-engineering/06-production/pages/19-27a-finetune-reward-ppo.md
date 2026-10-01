## Fine-tuning: reward modeling and PPO

- DPO (19-27) skips the reward model. The *original* alignment path — **RLHF** (18-04a) — trains one explicitly, and it's still used (especially for RL from *verifiable* rewards, like code that passes tests). Two pieces: a reward model, then a PPO loop.

:::mint
```python
# 1) reward model: learn to predict which response humans preferred
def reward_loss(reward_model, chosen, rejected):
    r_chosen  = reward_model(chosen)      # scalar score per response
    r_rejected = reward_model(rejected)
    return -F.logsigmoid(r_chosen - r_rejected).mean()   # chosen should score higher

# 2) PPO step (sketch): optimise the policy to maximise reward, staying near ref
def ppo_objective(logp, logp_old, advantage, kl, eps=0.2, beta=0.1):
    ratio = torch.exp(logp - logp_old)                   # policy change
    clipped = torch.clamp(ratio, 1-eps, 1+eps)
    return -(torch.min(ratio*advantage, clipped*advantage)).mean() + beta*kl
```
:::

- **The reward model** is a model with a scalar head, trained on the same preference pairs DPO uses, to output "how good is this response?" It's the learned proxy for human judgment — and the thing PPO then hacks if it's imperfect (18-04a).
- **PPO** (Proximal Policy Optimization) updates the policy to maximise the reward model's score, with two guardrails: the **clipped ratio** (don't change the policy too much per step — stability) and the **KL penalty** (`beta*kl`, stay near the reference model so it doesn't drift into reward-hacked gibberish). These are the two leashes on a powerful optimiser pointed at an imperfect reward.

:::interview
"DPO or PPO/reward-modeling — when would you use the RL path?"

DPO is simpler, more stable, and the default for aligning on human *preferences* — no separate reward model, no PPO loop to tune. I'd reach for the **RL path (reward model + PPO)** when the reward is *verifiable or programmatic* rather than a preference pair — RL from execution feedback (code that passes tests), from a rule-based checker, or from a reward model in domains like math/reasoning where you generate many attempts and reward the correct ones (the GRPO/RLVR family). PPO's clipped-ratio and KL penalty are what keep the powerful optimiser from hacking an imperfect reward. So: DPO for preference alignment, RL for verifiable/programmatic rewards where you want the model to *explore* toward a checkable objective.
:::
