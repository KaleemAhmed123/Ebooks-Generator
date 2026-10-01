## A worked GenAI trace

- One agent turn, as an OTel trace, so the abstraction becomes a debugging tool. The user asked for weather in two cities; the agent used parallel tool calls.

:::mint
```text
TRACE  agent.run                                    2.41s   ⤵
├─ SPAN gen_ai.chat  model=claude  in=210 out=48    0.79s
│     tool_calls=[get_weather(Paris), get_weather(Tokyo)]
├─ SPAN tool.get_weather  args={city:Paris}         0.32s   ✓ "14°C rain"
├─ SPAN tool.get_weather  args={city:Tokyo}         0.95s   ⚠ 0.95s (slow)
└─ SPAN gen_ai.chat  model=claude  in=290 out=31    0.34s
      output="Paris 14°C rainy; Tokyo 21°C clear"
   attributes: gen_ai.usage.input_tokens=500
               gen_ai.usage.output_tokens=79  cost=$0.004
```
:::

- **Read the tree.** The run is the trace; each model call and tool call is a span with duration, inputs, and outputs. You can see the model requested two tools, they ran (the Tokyo call was slow), and the model composed the final answer from both results.
- **What it lets you catch:**
  - **Latency** — the Tokyo tool took 0.95s; if runs are slow, the trace shows exactly which span to blame.
  - **Cost** — token counts and cost per step roll up to the trace; you find the expensive step.
  - **Correctness** — if the answer is wrong, you inspect each span's output to find where truth broke (a bad tool result vs a model misread).
- Multiply this across thousands of production runs and you can query "which tool is slowest," "which prompt version costs most," "where do failures cluster" — the questions Module 14's observability tools answer.

:::interview
"An agent gives a wrong final answer in production. How do you find why?"

Pull its trace. Walk the spans in order: was the tool called with the right arguments? Did the tool return correct data (inspect its output span)? Did the model misread a correct result (compare the tool output to the next model call's output)? The trace localizes the failure to a specific span — bad arguments, bad tool result, or bad model reasoning — which a flat log cannot. No tracing, no debuggable agents.
:::
