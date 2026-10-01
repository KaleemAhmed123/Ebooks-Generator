## Plan-and-execute vs ReAct — what's the difference and when use each?

- **ReAct** decides the next step **one at a time**, reacting to each observation. Flexible, but can wander, lose the thread on long tasks, and spends an LLM call per step.
- **Plan-and-execute** first makes a **full plan** (a list of steps), then executes them, optionally re-planning if something fails (ReWOO is a variant that plans all tool calls upfront to cut LLM calls).
- Trade-offs:
  - **Planning first** gives structure and foresight for multi-step tasks, is cheaper (fewer planning calls), and is easier to audit — but a rigid plan can break when reality diverges.
  - **ReAct** adapts step-by-step but can meander and is costlier per step.
- Use planning for **long, decomposable** tasks where foresight helps; use ReAct for **short, exploratory** tasks where each step depends heavily on the last. Many systems combine them: plan, execute with ReAct-style adaptation, re-plan on failure.

:::interview
What's really being tested: upfront-plan (structured, cheaper, foresight) vs step-by-step react (adaptive, meandering), and matching to task length/predictability — plus knowing they combine.
:::
