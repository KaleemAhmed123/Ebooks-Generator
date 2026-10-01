## What is the ReAct pattern?

- **ReAct (Reason + Act)** interleaves **reasoning traces** with **actions**: the agent writes a thought, takes an action (tool call), observes the result, writes the next thought, and so on.
- The thought step matters: forcing the model to reason before acting improves tool choice and lets it adjust to results, rather than blindly firing tools.
- A ReAct trace looks like: **Thought** ("I need the user's order date") → **Action** (`lookup_order(id)`) → **Observation** (the result) → **Thought** ("now I can compute…") → … → **Answer**.
- It's the default foundation for tool-using agents because it's simple and transparent (the thoughts are debuggable). Weaknesses: it can loop, over-call tools, or rationalise; and long traces consume context — which is why reflection, planning, and verification patterns build on top of it.

:::interview
What's really being tested: that ReAct = reason-then-act interleaved with observations, why the explicit thought helps tool use, and its failure modes (loops, context growth) that motivate higher patterns.
:::
