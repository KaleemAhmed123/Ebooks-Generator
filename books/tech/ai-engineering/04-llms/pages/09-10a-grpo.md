## GRPO: PPO without the critic

- PPO's critic exists for one job: give every action an *expected* reward to compare against, so the advantage is "better or worse than expected" rather than raw reward. **GRPO (group relative policy optimization)** gets that baseline for free and throws the critic away.
- The idea is almost obvious once stated: for a single prompt, **sample a group of answers** (say 8) from the current policy, score each with the reward model, and use the **group's own average score as the baseline**. An answer is "good" if it beat its siblings on the same question — no value network required to predict anything.

<svg viewBox="0 0 330 118" role="img" aria-label="One prompt is answered several times; each answer is scored; the group average becomes the baseline; answers above it are pushed up, below it pushed down" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="8" y="48" width="54" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="35" y="61" text-anchor="middle">prompt</text>
  <g fill="#fff" stroke="#24405e">
    <rect x="96" y="8" width="70" height="16" rx="3"/><rect x="96" y="32" width="70" height="16" rx="3"/><rect x="96" y="56" width="70" height="16" rx="3"/><rect x="96" y="80" width="70" height="16" rx="3"/>
  </g>
  <text x="131" y="20" text-anchor="middle">ans A · 0.9</text><text x="131" y="44" text-anchor="middle">ans B · 0.4</text>
  <text x="131" y="68" text-anchor="middle">ans C · 0.8</text><text x="131" y="92" text-anchor="middle">ans D · 0.1</text>
  <path d="M62 54 L94 16" stroke="#bbb"/><path d="M62 56 L94 40" stroke="#bbb"/><path d="M62 60 L94 64" stroke="#bbb"/><path d="M62 62 L94 88" stroke="#bbb"/>
  <line x1="196" y1="8" x2="196" y2="96" stroke="#ccc" stroke-dasharray="2 2"/>
  <text x="210" y="50" fill="#6b6b6b">group avg</text><text x="210" y="60" fill="#6b6b6b">= 0.55 (baseline)</text>
  <text x="270" y="18" fill="#1a3a2a">A,C &gt; avg → ↑</text>
  <text x="270" y="90" fill="#c0392b">B,D &lt; avg → ↓</text>
</svg>

- Each answer's **advantage** is its reward minus the group mean, divided by the group's spread (standard deviation). Plug that advantage straight into PPO's clipped objective — same guard rail, same KL leash to the SFT model — but with no critic to train, tune, or hold in memory.

:::mint
```
for each prompt:
    answers  = policy.sample(prompt, n=G)        # a whole group, not one
    rewards  = [reward_model(prompt, a) for a in answers]
    baseline = mean(rewards)
    advantage[i] = (rewards[i] - baseline) / std(rewards)   # the group IS the critic
    # then the ordinary PPO clipped update, weighting each answer by its advantage
```
:::

### Run the numbers — the group is the baseline

Four answers to one prompt, scored by the reward model: **0.9, 0.4, 0.8, 0.1**.

| answer | reward | reward − mean (0.55) | advantage (÷ std ≈ 0.32) | update |
|---|---|---|---|---|
| A | 0.9 | +0.35 | **+1.09** | push up hardest |
| C | 0.8 | +0.25 | **+0.78** | push up |
| B | 0.4 | −0.15 | **−0.47** | push down |
| D | 0.1 | −0.45 | **−1.41** | push down hardest |

- Nothing *predicted* the 0.55 bar — it is just this group's average. The policy learns "be more like A and C, less like B and D on this kind of question," which is exactly the signal a critic would have tried to supply.

- Why it caught on: dropping the critic removes a second full-size network from memory and a second thing that can diverge. It shines when reward is **cheap and verifiable** — math and code, where you can sample many answers and score each by "did it pass?" GRPO (DeepSeekMath, 2024) trained the DeepSeek-R1 reasoning model (2025) this way.

:::warn
GRPO's signal lives entirely in the *spread* within a group. If every sampled answer is equally good — or equally bad — the rewards are flat, every advantage is ≈ 0, and that prompt teaches the model nothing. It also pays for the missing critic in generation: you now sample G answers per prompt instead of one, so forward-pass cost rises where PPO's memory cost fell.
:::
