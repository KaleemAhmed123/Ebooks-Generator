## Flagship 8: multi-agent software team — build

- **Goal:** build a team of specialised agents that ship a feature together — a planner, a coder, a reviewer, a tester — coordinated by a supervisor (Booklet 5's orchestration). The value is *role specialisation*; the danger is coordination overhead.

:::mint
```python
def software_team(task, repo):
    plan   = planner_agent(task, repo)                  # break into steps
    for step in plan.steps:
        code = coder_agent(step, repo)                  # implement one step
        for attempt in range(3):
            review = reviewer_agent(code, step)         # critique (fresh context)
            if review.approved: break
            code = coder_agent.revise(code, review.notes)
        tests = tester_agent(code, step)                # write + run tests (sandbox)
        if not tests.passed:
            code = coder_agent.fix(code, tests.failures) # loop on failure
        commit(repo, code)
    return summarize(plan, repo)
```
:::

- **Each role is a sub-agent with a focused prompt and its own tools** (Booklet 5): the planner decomposes, the coder edits (Flagship 4's harness), the reviewer critiques with a *fresh context* (the self-review lesson — an agent is a poor judge of its own work), the tester runs the verification gate (Flagship 4). Specialisation lets each do one thing well.
- **The supervisor sequences them and holds shared state** — the plan, the repo, what's done. Booklet 5's supervisor topology, chosen because software work is a *dependency graph* (plan before code, code before test), not an unstructured debate.

:::warn
Multi-agent is not free capability — it multiplies the failure surface (Booklet 5's MAST taxonomy). Agents talk past each other, the reviewer rubber-stamps if it shares the coder's context, errors compound across handoffs, and coordination burns tokens a single strong agent wouldn't. Use a team *only when the task genuinely decomposes into specialised roles* with clear handoffs — and keep the verification gates (tests) as the objective truth that no agent's opinion can override. Many "multi-agent" tasks are done better and cheaper by one capable agent with good tools.
:::
