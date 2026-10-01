## "Tell me about a time you improved an AI system's quality measurably."

- **What they're screening for:** a rigorous, eval-driven improvement loop — the core of real AI engineering work.
- **A strong answer shows:**
  - **A baseline with a metric** — you measured where it was before (on a real eval set), so "improvement" means something.
  - **Diagnosis** — you found *why* it was failing (e.g. retrieval missing the right chunk, bad chunking, weak prompt, wrong model) from traces/error analysis, rather than guessing.
  - **A targeted change** — the specific fix (added a re-ranker, fixed chunking, few-shot examples, fine-tuned), ideally changing one thing at a time.
  - **A measured result** — the before/after number on the eval and, better, the downstream product metric.
  - **Iteration** — you looped: measure, hypothesise, change, re-measure.
- The structure itself (baseline → diagnose → change → re-measure) is the signal.

:::warn
Weak: "I improved the prompt and it got better." Strong: "Groundedness was 72% (200-question eval). Error analysis showed retrieval misses; adding a cross-encoder re-ranker took it to 88%, and user thumbs-up rose 9 points."
:::

:::interview
What's really being tested: an eval-driven improvement loop with a baseline, root-cause diagnosis, a targeted change, and a measured before/after — the daily craft of the role.
:::
