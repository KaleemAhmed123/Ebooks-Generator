## What does eval-driven agent development look like?

- Agents are too non-deterministic to improve by eyeballing. The discipline: build the **eval first**, then iterate against it — like TDD for agents.
- The loop:
  - **Collect real tasks** with checkable success (the golden set), including the failures you've seen.
  - **Instrument** every run with tracing so you can see trajectories.
  - **Score** outcome + trajectory (did it succeed; did it take sensible steps; cost/latency), with deterministic checks where possible and an LLM judge for the rest.
  - **Change one thing** (prompt, tool, model, scaffolding), re-run the suite, compare — in CI, so regressions are caught.
  - **Mine production traces** for new failure cases and feed them back into the eval set.
- Why it matters: without this, "improvements" are guesses that fix one case and silently break three. The eval set is the ground truth that makes iteration real.

:::interview
What's really being tested: that you drive agent development with a golden eval + tracing + CI (change-one-thing, measure), and continuously grow the eval from production failures — not vibe-based tweaking.
:::
