## DSPy for agents

- DSPy is not an orchestration framework, but it *builds agents* — via its `ReAct` module and composed pipelines — and, uniquely, it can **optimize** them. That optimization angle is why it belongs alongside the orchestration frameworks.

<svg viewBox="0 0 360 86" role="img" aria-label="A DSPy ReAct agent's prompts are optimized against a task metric, unlike hand-prompted agents" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="30" width="90" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="59" y="43" text-anchor="middle" font-size="6">dspy.ReAct(sig,</text><text x="59" y="52" text-anchor="middle" font-size="6">tools)</text>
  <rect x="134" y="28" width="96" height="30" rx="4" fill="#a03050"/><text x="182" y="42" text-anchor="middle" fill="#fff" font-size="6">optimize on task</text><text x="182" y="52" text-anchor="middle" fill="#fc8" font-size="5.5">metric + examples</text>
  <rect x="260" y="30" width="90" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="305" y="43" text-anchor="middle" font-size="6">tuned agent</text><text x="305" y="52" text-anchor="middle" font-size="5.5" fill="#6b6b6b">better tool use</text>
  <path d="M104 43 L132 43" stroke="#888" marker-end="url(#da)"/><path d="M230 43 L258 43" stroke="#888" marker-end="url(#da)"/>
  <defs><marker id="da" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **`dspy.ReAct(signature, tools=[...])`** gives you a tool-using agent whose reasoning and tool-use prompts are *compiled*. Optimize it against a task metric (did it reach the right answer?) and DSPy tunes how the agent reasons about and calls its tools — an agent that *learns to use its tools better* from examples, without you hand-tuning the prompts.
- **Combine with orchestration frameworks.** DSPy and LangGraph are not rivals — a common pattern is LangGraph handling the control flow and *DSPy-optimized modules inside the nodes* doing the actual LLM calls, so the orchestration is explicit and the prompts are optimized. Each does what it is best at.
- **Where the optimization pays off:** high-volume, repeated tasks where a few points of accuracy matter and you have examples to optimize against — classification-heavy agents, extraction pipelines, anything you run millions of times. For a bespoke one-off agent, the optimization overhead is not worth it.

:::interview
"How does DSPy relate to frameworks like LangGraph for agents?"

They solve different problems and compose. LangGraph orchestrates control flow (nodes, edges, state, persistence); DSPy *optimizes the prompts* inside the LLM calls. DSPy can build agents (its `ReAct` module) and, uniquely, tune their reasoning/tool-use prompts against a metric — but it isn't an orchestration or persistence layer. The strong pattern is LangGraph for the flow with DSPy-compiled modules doing the model calls. Use DSPy when measurable prompt optimization over many runs matters; use an orchestration framework for the loop and state.
:::
