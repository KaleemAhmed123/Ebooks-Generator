## Coding agent: the dispatch loop

- The **agent loop** ties it together: send the task and tool specs to the model, execute the tool calls it returns, feed observations back, repeat until it signals done or hits a budget. This is the harness's beating heart.

:::mint
```python
def run_agent(task, registry, model, max_steps=30, obs_budget=8000):
    messages = [{"role": "user", "content": task}]
    for step in range(max_steps):                     # step budget
        resp = model.chat(messages, tools=registry.specs())
        if resp.stop_reason == "end_turn":
            return resp.text                           # agent is done
        results = []
        for call in resp.tool_calls:                   # may be several
            out = registry.dispatch(call.name, call.args)
            out = truncate(out, obs_budget)            # observation budget
            results.append({"tool_call_id": call.id, "content": out})
        messages.append(resp.as_message())
        messages.append({"role": "tool", "content": results})
    return "budget exhausted"                          # never loop forever
```
:::

- **Plan-execute in practice.** The model *plans* (decides the next tool call), the harness *executes* (runs it), the observation feeds the next plan. Complex tasks emerge from many small plan-execute steps — you don't need a separate planner; the loop *is* the plan-execute pattern (Booklet 5) when the model is prompted to think before acting.
- **Two budgets keep it bounded.** A **step budget** (`max_steps`) stops infinite loops — the number-one agent failure. An **observation budget** truncates tool outputs so a single `cat huge_file` doesn't blow the context window and cost. Both are non-negotiable in production (Booklet 5's cost governors, 17-55).

:::warn
The observation budget is subtle and vital: a tool that returns a 200k-token file (a log, a dependency tree, a minified bundle) will, unbudgeted, flood the context — spiking cost, evicting the useful history, and often derailing the agent into confusion. Truncate every observation to a budget, and prefer tools that return *summaries or ranges* over raw dumps (`grep` over `cat`, `head` over the whole file). Managing what goes *into* the context each step is as important as the model's reasoning — a coding agent lives or dies by its context hygiene.
:::
