## "The demo was flawless but production is shaky. How do you handle it?"

- **What they're screening for:** awareness that AI demos lie — a cherry-picked demo hides the long tail — and that you plan for the gap.
- **A strong answer shows:**
  - **Why it happens** — demos use happy-path inputs; production brings adversarial, messy, long-tail, multilingual inputs the demo never saw. 90% on a demo can be 60% on real traffic.
  - **How you de-risk before trusting a demo** — build a representative eval set from real/expected inputs early, shadow real traffic, and measure on the tail, not the showcase.
  - **The rollout discipline** — canary/progressive with monitoring, so the gap surfaces at 5% traffic, not 100%.
  - **Expectation-setting** — you proactively tell stakeholders a demo ≠ production and show the eval numbers that matter.
- The theme: **don't trust demos; trust evals on representative data.**

:::warn
Weak: "The demo worked, so I shipped it." Strong: "A demo is a biased sample; I validate on a representative eval set and canary before trusting it — the tail is where it breaks."
:::

:::interview
What's really being tested: that you know the demo-to-prod gap is about distribution (happy path vs long tail) and defend against it with representative evals + progressive rollout.
:::
