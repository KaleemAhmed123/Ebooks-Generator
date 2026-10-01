## OpenAI SDK: agents and tools

- Defining an agent is a few lines; tools are just decorated Python functions, with the SDK generating the schema from type hints and docstring. **[VERIFY current API]**

:::mint
```python
from agents import Agent, function_tool

@function_tool                                  # exposes this as a tool
def get_weather(city: str) -> str:
    """Get current weather for a city."""       # → tool description
    return f"{lookup(city)}"

assistant = Agent(
    name="Assistant",
    instructions="You are helpful. Use tools for live data.",
    tools=[get_weather],
    model="gpt-...",                            # [VERIFY]
)
```
:::

- **`@function_tool` turns a function into a tool** — the SDK reads the signature (`city: str` → a required string param) and docstring (→ the description) to build the schema, exactly the schema-from-types idea you saw in MCP's FastMCP (13-25). Write a normal function; the SDK handles the tool plumbing.
- **`Agent` bundles** a name, `instructions` (its system prompt), its tools, and the model. That is the complete agent definition — no graph, no state class. The minimalism is the point: this is the raw agent loop (14-03) wrapped just enough to be convenient.
- **Structured output** is a first-class option — set an `output_type` (e.g. a Pydantic model) and the agent returns validated typed data instead of free text (13-11), which the SDK enforces.

:::interview
"How do you define a tool in the OpenAI Agents SDK?"

Decorate a Python function with `@function_tool`. The SDK derives the tool's schema from the function's type hints (parameter names and types) and its description from the docstring, so you just write a normal, documented function. You then list it in the agent's `tools`. It's the same "types and docstring become the schema" ergonomics as FastMCP — minimal boilerplate, and it keeps schema design (naming, descriptions, types) as the thing that actually matters.
:::
