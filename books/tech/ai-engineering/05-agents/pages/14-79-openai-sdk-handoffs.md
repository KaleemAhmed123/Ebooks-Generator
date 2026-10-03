## OpenAI SDK: handoffs

- **Handoffs** are the SDK's multi-agent primitive: one agent can **delegate** the conversation to another, more specialized agent. A handoff is itself exposed to the model as a kind of tool — the agent "calls" a handoff to transfer control.

:::mint
```python
from agents import Agent, Runner

billing = Agent(name="Billing", instructions="Handle billing questions.")
tech    = Agent(name="Tech",    instructions="Handle technical issues.")

triage = Agent(
    name="Triage",
    instructions="Route the user to the right specialist.",
    handoffs=[billing, tech],          # can delegate to these
)

result = await Runner.run(triage, "My invoice is wrong.")
# triage hands off to `billing`, which answers.
```
:::

- **How it works:** you list other agents in an agent's `handoffs`. The Runner presents each as a transfer option; when the model decides another agent is better suited, it triggers the handoff, and the Runner **switches the active agent** — the specialist continues the conversation with the full context. It is the routing pattern (14-37) and the network/handoff topology (14-57) in a couple of lines.
- **Why handoffs over one mega-agent:** each specialist has focused instructions and its own tools, so it outperforms a single agent trying to be everything (the separation-of-concerns argument again). The triage agent stays simple — it only routes.
- **Chains and returns.** Handoffs can chain (triage → tech → escalation), and you can design agents that hand back. This composes into supervisor/network multi-agent systems without a separate framework.

:::interview
"How does the OpenAI Agents SDK do multi-agent?"

Handoffs. You give an agent a list of other agents it can delegate to; the SDK exposes each as a transfer the model can invoke. When the current agent decides another is better suited, control switches to that specialist, which continues with full context. It's the routing/triage pattern expressed minimally — a triage agent routes to billing or tech specialists — and it composes into supervisor and network topologies without any extra machinery. The elegance is that a handoff is just another tool call.
:::
