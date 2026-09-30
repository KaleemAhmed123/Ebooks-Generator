## LangGraph: streaming

- A long agent run is silent by default — the user waits with no feedback while it thinks and calls tools. **Streaming** surfaces the run as it happens. LangGraph streams at several granularities. **[VERIFY current API — `stream_mode`]**

:::mint
```python
for chunk in app.stream(input, config, stream_mode="updates"):
    print(chunk)      # each node's state update as it completes

# stream_mode options (combine as a list):
#   "values"   → the full state after each step
#   "updates"  → just what each node changed
#   "messages" → LLM tokens as they generate (for live text)
#   "custom"   → your own progress events from inside nodes
```
:::

- **Why multiple modes:** different UIs need different granularity.
  - **`messages`** streams the model's tokens — for showing the answer typing out live.
  - **`updates`** streams each node's output — for a progress view ("searching…", "calculating…") that shows the agent's steps as they finish.
  - **`values`** streams the whole state each step — for a live inspector of everything.
  - **`custom`** lets a node emit its own progress events ("downloaded 3 of 10 files").
- **Why it matters for agents specifically:** agent runs are *long* (many model+tool steps). Without streaming, the user stares at a spinner for 30 seconds and assumes it hung. Streaming the steps ("found the capital, now getting population…") keeps the run legible and the user patient — the same UX stakes as omni-model streaming (12-33), here for text agents.

:::note
Streaming is where LangGraph's explicit-graph design pays a UX dividend: because each node is a discrete, named step, the framework can emit an event as each one runs, giving you a real-time view of the agent's reasoning for free. A raw loop would have to be manually instrumented to do the same. Show users the *steps*, not just the final answer — it turns an opaque wait into visible progress and builds trust in what the agent is doing.
:::
