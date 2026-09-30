## OpenAI SDK: a worked triage system

- The primitives combined: a triage agent that routes to specialists, with a guardrail and a session. A complete small multi-agent app. **[VERIFY current API]**

:::mint
```python
from agents import Agent, Runner, function_tool, SQLiteSession

@function_tool
def lookup_invoice(id: str) -> str:
    """Look up an invoice by id."""
    return billing_db.get(id)

billing = Agent(name="Billing", instructions="Resolve billing issues.",
                tools=[lookup_invoice])
tech    = Agent(name="Tech", instructions="Resolve technical issues.")

triage = Agent(
    name="Triage",
    instructions="Route to Billing or Tech. Do not answer directly.",
    handoffs=[billing, tech],
    input_guardrails=[on_topic_guardrail],     # reject off-topic input
)

session = SQLiteSession("user-42")
print((await Runner.run(triage, "Invoice #77 is wrong.", session=session)).final_output)
```
:::

- **Trace the run:** the input guardrail checks the request is on-topic → triage decides it is billing → hands off to `billing` → billing calls `lookup_invoice("77")` → returns the answer → the session records it for the next turn. Routing, tools, guardrails, memory — all four primitives in ~15 lines.
- **Compare:** LangGraph would make this an explicit graph (more control, more code); CrewAI a crew; AutoGen a conversation. The Agents SDK is the **fewest concepts** for a tool-using, guarded, multi-agent app — its whole value in one example.

:::interview
**"Build a support triage agent — what's the minimal shape?"** A triage agent whose only job is routing, with `handoffs` to specialist agents (billing, tech), each holding its own tools. Add an input guardrail to reject off-topic requests before the model runs, and a session for memory. The Runner drives the loop and switches agents on handoff — ~15 lines in the OpenAI Agents SDK. A graph framework is more code but more controllable; match the framework's weight to the control the task needs.
:::
