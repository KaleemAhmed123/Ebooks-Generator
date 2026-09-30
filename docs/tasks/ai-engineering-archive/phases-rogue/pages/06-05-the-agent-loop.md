# AI Engineering: From Scratch

## The Agent Loop

Every autonomous AI agent in existence (Claude Code, Devin, AutoGen) is built on a single, invariant control flow: the **ReAct (Reason + Act)** loop.

### Observe, Think, Act

1. **Thought:** The model analyzes the current state and plans its next move.
2. **Action:** The model emits a tool call (e.g., `search_codebase("auth_bug")`).
3. **Observation:** The system executes the tool and appends the raw result to the chat history.
4. **Loop:** The model reads the observation, updates its thought process, and takes the next action. This repeats until the model explicitly calls a `finish()` tool.

### Frameworks are just scaffolding

Whether you use LangGraph (stateful graphs), AutoGen (actor model), or the OpenAI Agents SDK, they are all just wrappers around this while-loop. 

The hardest part of Agent Engineering is not the loop itself, but the **failure modes**. If a tool returns a 404 error, an agent will often hallucinate that it succeeded and continue blindly. Hardening an agent requires rigorous evaluation, explicit scope contracts, and bounding the loop with a maximum turn budget.
