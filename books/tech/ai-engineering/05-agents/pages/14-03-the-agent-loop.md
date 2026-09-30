## The agent loop

- Strip every framework away and the same loop remains. It is a dozen lines of code; the frameworks (later) add persistence, streaming, and structure, but *this* is the engine.

:::mint
```python
messages = [user_goal]
while True:
    response = model(messages, tools=tools)     # 1. THINK
    messages.append(response)
    if not response.tool_calls:                 # 2. no tool? → done
        return response.text
    for call in response.tool_calls:            # 3. ACT
        result = run_tool(call.name, call.args)
        messages.append(tool_result(call.id, result))  # 4. OBSERVE
    # 5. loop: model now sees the results and decides again
```
:::

- Read it as **think → act → observe → repeat**:
  1. **Think** — the model looks at the goal and everything so far, and either answers or requests tools.
  2. **Stop condition** — if it answered with text (no tool call), the loop ends. This is the natural brake (13-07).
  3. **Act** — run each requested tool (your code, your gate).
  4. **Observe** — append the results; the model will see them next turn.
  5. **Repeat** — call the model again with the growing history; it decides the next step from what it just learned.
- **The whole history grows every turn** and is resent each time (the model is stateless). This is why long agent runs get expensive and why context management (14-06) matters.

:::note
This loop is the single most important idea in the module. ReAct, plan-and-execute, Reflexion — every reasoning pattern (next cluster) is a *variation on what happens in step 1* (how the model thinks) or *what you keep in `messages`* (memory). LangGraph, CrewAI, AutoGen — every framework is this loop plus infrastructure. Internalize these ten lines and the rest is detail.
:::
