## LLM-as-judge, in depth

- LLM-as-judge (19-72) scales open-ended eval, but a naive judge is biased and unreliable. Making it *trustworthy* takes specific techniques — and knowing the biases is what separates a usable judge from a misleading one.

| Bias | The judge tends to… | Mitigation |
|---|---|---|
| **position** | favor the first (or second) option shown | swap order, average both |
| **verbosity** | rate longer answers higher | control for length; penalize padding |
| **self-preference** | favor outputs from its own model family | use a different model as judge |
| **sycophancy** | agree with a stated/implied "right" answer | don't leak the expected answer |
| **leniency** | cluster scores high, poor discrimination | force a rubric + reasons |

- **A rubric beats a raw score.** "Rate 1–10" gives noisy, lenient numbers; a *rubric* ("does it cite sources? is it factually correct? does it answer the question?") with the judge stating *reasons per criterion* gives reliable, auditable scores. Pairwise comparison ("is A or B better?") is often more reliable than absolute scoring.
- **Calibrate against humans.** The judge is a *proxy* — validate it against a human-labeled set, measure its agreement, and use it for *relative trends and gating*, not absolute truth. If the judge disagrees with humans 30% of the time, its scores gate nothing until you fix the rubric or the judge.

:::interview
"How do you make LLM-as-judge reliable enough to gate releases?"

Treat the judge as an instrument you must calibrate, not an oracle. Control its known biases: **randomize position** and average (position bias), **control for length** (verbosity bias), use a **different model family** as judge (self-preference), and don't leak the expected answer (sycophancy). Force a **rubric with per-criterion reasons** rather than a raw 1–10 (leniency and noise), and prefer **pairwise comparison** where possible. Then **calibrate against a human-labeled set** — measure agreement, and only trust the judge for gating where it agrees with humans well. Use it for *relative trends* (did this change improve the win-rate?), keep humans in the loop for absolute high-stakes judgments. The signal: naming the biases and the calibration step, not treating "ask GPT to grade it" as sufficient.
:::
