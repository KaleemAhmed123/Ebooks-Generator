## OpenAI SDK: the Runner loop

- You do not write the agent loop — the **Runner** does. You hand it an agent and an input; it runs the think→act→observe cycle (14-03) until the agent produces a final output.

:::mint
```python
from agents import Runner

result = await Runner.run(assistant, "Weather in Paris?")
print(result.final_output)        # "It's 14°C and rainy in Paris."

# streaming variant:
async for event in Runner.run_streamed(assistant, "...").stream_events():
    ...                            # tokens/steps as they happen
```
:::

- **What the Runner does under the hood:** calls the model → if it requested tools, runs them and feeds results back → loops → until the model returns a final answer (or a handoff, or a guardrail trips, or a max-turn cap hits). It is the loop of 14-03, managed for you, with the stop conditions of 14-05 built in.
- **The loop is hidden but bounded.** The Runner enforces a **max-turns** limit so a misbehaving agent cannot spin forever — the essential backstop (14-05) you get by default. Handoffs and guardrails (next pages) also terminate or redirect the loop.
- **Sync and streaming** both come from the Runner: `run` for a final result, `run_streamed` to surface tokens and steps live (the streaming UX of 14-55).

:::note
The Runner is the SDK's core convenience: it hides the loop but keeps its guarantees (bounded turns, tool round-trips, clean termination). This is the right level of abstraction for most agents — you think about the *agent* (its instructions and tools) and let the framework run the loop correctly. You only need to see inside the loop (as LangGraph exposes) when you must customize *when* and *how* it steps — which the minimal SDK deliberately does not let you do.
:::
