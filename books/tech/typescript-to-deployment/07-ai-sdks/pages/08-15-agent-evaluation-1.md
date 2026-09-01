## Evaluating an agent

- Evaluating a single call is scoring one output. Evaluating an agent is scoring **a path**, and the path can be wrong when the answer is right
- An agent that reaches the correct answer after twelve steps and three failed tool calls is a cost problem waiting to be a quality problem

### What to score

| Measure | Catches |
|---|---|
| **final answer correct** | the obvious failure |
| **steps taken** | wandering, retry loops |
| **tools called, in order** | using the wrong tool, or skipping a required one |
| **tokens per run** | the cost regression a prompt change caused |
| **budget exhausted rate** | runs that never finished |
| **approval requests** | an agent trying things it should not |

```ts
const result = await supportAgent.generate({ prompt: c.input })

const toolsUsed = result.steps.flatMap((s) => s.toolCalls.map((t) => t.toolName))

expect(toolsUsed).toContain("getOrder")
expect(result.steps.length).toBeLessThan(6)
expect(result.text).toMatch(/o_842/)
```
