## How do you A/B test an LLM change when output quality is subjective?

- You can't diff outputs for equality, so you measure **downstream effects** and **judged quality**, not string matches.
- Metrics to compare between arms:
  - **Product/behavioural** — task success, user thumbs-up/down, acceptance/edit rate, deflection, retry rate, session length, conversion. These are objective and causal.
  - **Operational** — latency, cost per request, guardrail/error rates.
  - **Judged quality** — LLM-as-judge or human rating on a sample, for a direct quality read.
- Methodology that catches people out:
  - **Randomise at the user level** (not request) to avoid a user seeing both and to measure real experience.
  - **Power/sample size** — LLM effects are often small; make sure the test can detect the effect before calling it.
  - **Guard against novelty effects** and segment by cohort.
- Decide on a **pre-registered primary metric**, not whichever number looks good after.

:::interview
What's really being tested: that you A/B on downstream product + operational + judged metrics (not output equality), randomise at user level, and respect power and a pre-chosen primary metric.
:::
