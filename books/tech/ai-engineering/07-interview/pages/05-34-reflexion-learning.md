## How can an agent learn from its mistakes within a task or across runs?

- Agents don't update weights at inference, so "learning" means **feeding past outcomes back into context/memory**, not training.
- Within a run (**Reflexion**): after a failed attempt, the agent writes a **verbal self-reflection** ("the test failed because I misread the signature") into its context and retries with that lesson. Works when there's a concrete failure signal (test, error, verifier).
- Across runs (**experiential memory**):
  - **Skill libraries** (Voyager-style) — on success, save a reusable routine/code snippet to a library for future tasks.
  - **Lesson store** — write what worked/failed to long-term memory and retrieve relevant lessons on similar future tasks.
  - **Trajectory distillation** — collect good trajectories and later fine-tune on them (the only path that touches weights).
- Caveat: self-reflection without external grounding tends to rationalise, and accumulated "lessons" can become stale or wrong — curate them.

:::interview
What's really being tested: that in-context learning (Reflexion, skill libraries, lesson memory) is how agents "learn" without weight updates, that it needs a real feedback signal, and that fine-tuning on trajectories is the only weight-level option.
:::
