## Coding agent: tool registry and schema

- Tools are the agent's hands. The **registry** holds each tool's name, JSON Schema, and implementation, and — critically — *validates* every call against the schema before running it, so a malformed model output can never reach the implementation.

:::mint
```python
from pydantic import BaseModel, ValidationError

class ToolRegistry:
    def __init__(self): self.tools = {}
    def register(self, name, schema, fn):
        self.tools[name] = {"schema": schema, "fn": fn}
    def specs(self):                              # what the model sees
        return [{"name": n, "input_schema": t["schema"].model_json_schema()}
                for n, t in self.tools.items()]
    def dispatch(self, name, args):
        tool = self.tools.get(name)
        if not tool: return {"error": f"unknown tool {name}"}
        try: validated = tool["schema"](**args)   # schema validation gate
        except ValidationError as e: return {"error": f"bad args: {e}"}  # retry, don't crash
        return tool["fn"](validated)

class ReadFileArgs(BaseModel): path: str
registry.register("read_file", ReadFileArgs, lambda a: open(a.path).read())
```
:::

- **Validation is a safety and reliability boundary.** The model *will* occasionally emit malformed arguments (wrong types, missing fields, a hallucinated path). Validating against the schema turns that into a *clean error the model can read and retry* — not a crash, not an undefined action. The error message is part of the contract.
- **The schema is also the model's documentation** — `specs()` is what you send in the tool definitions (Booklet 5): it tells the model how to call the tool *and* enforces that it did.

:::warn
Two registry disciplines prevent the worst failures. **Least privilege:** register only the tools this agent needs — a code-review agent gets `read_file` and `run_tests`, not `delete_file` (trifecta-breaking, Module 18). **Confirmation:** mark destructive tools (write, delete, shell) so the dispatcher requires confirmation or the sandbox. The tools you *don't* register matter as much as the ones you do — a registry that hands every agent a full shell is a prompt injection away from a wiped repo.
:::
