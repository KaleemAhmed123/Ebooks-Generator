## How does an agent know when to stop — and how do you stop a runaway one?

- Two kinds of stopping: the agent **deciding it's done**, and the system **forcing a halt**.
- **Goal-based termination:** the agent signals completion (emits a final answer / calls a `finish` tool) when it judges the task solved. Reliable only if "done" is well-defined — add a **verification check** (tests pass, output matches schema) rather than trusting self-assessment.
- **Hard limits (the safety net):** max steps/iterations, a wall-clock timeout, a token/dollar **budget**, and loop detection (same action repeated → break). These stop a lost or looping agent from burning money.
- **Failure handling:** on hitting a limit, fail gracefully — return partial progress, escalate to a human, or roll back — rather than silently stopping.
- Interview framing: never ship an agent without hard bounds. Self-termination is the happy path; budgets and loop detection are what keep an autonomous loop from running away.

:::interview
What's really being tested: that you pair goal-based termination (ideally verified) with hard budgets/step caps/loop detection, and handle hitting a limit gracefully — bounding the loop is non-negotiable.
:::
