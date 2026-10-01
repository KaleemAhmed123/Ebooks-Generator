## How do you evaluate an agent — and why isn't final-answer accuracy enough?

- An agent can reach the right answer the wrong way (lucky guess, wasteful detours) or fail late in a good trajectory. So evaluate on two axes:
  - **Outcome eval** — did it achieve the goal? (task success rate, correctness of the final result, did it pass the tests). The bottom line.
  - **Trajectory eval** — *how* did it get there? Did it call the right tools in a sensible order, avoid loops, stay in budget, not take unsafe actions? This localises *why* it fails and catches right-answer-wrong-reason.
- Add **component evals** — test tool selection, retrieval, and sub-steps in isolation so you know which part broke.
- Practical setup: a suite of tasks with checkable success, LLM-as-judge for trajectory quality (validated against humans), and production **tracing** to eval real runs. Track success rate, steps, cost, and latency together.
- Interview framing: outcome tells you *if*, trajectory tells you *why* — you need both to improve an agent.

:::interview
What's really being tested: that you separate outcome from trajectory (and component) evaluation, and measure cost/steps alongside success — not just "did the final answer look right."
:::
