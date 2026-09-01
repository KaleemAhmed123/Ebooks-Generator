## Running code an agent wrote

- Data analysis, chart generation and file conversion are all far easier if the model can write and run code
- **That is arbitrary code execution, requested by a model, on input an attacker may control.** It is the highest-risk pattern in this booklet
- It is also legitimate and common, so the question is containment rather than avoidance

### The options, safest first

| Option | Isolation | Cost |
|---|---|---|
| **provider sandbox** (`code_execution`) | theirs, no network | per session, data leaves |
| **a hosted sandbox service** | strong, managed | per run |
| **a container per run** | good, if configured properly | you operate it |
| **a JS runtime in-process** | weak, escapable | tempting and wrong |

- **`vm` and `vm2` in Node are not security boundaries.** The documentation says so. A sandbox escape from `vm` is a known technique, not a theoretical one
