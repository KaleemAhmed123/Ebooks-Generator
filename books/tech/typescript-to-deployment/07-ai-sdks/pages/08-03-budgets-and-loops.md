## Budgets and loops

- An agent with no limit is an open-ended spend authorised by a model. That is not a hypothetical failure
- The common shape: a tool returns an error, the model retries it, the error repeats, and it retries again until something stops it

### The four limits every agent needs

| Limit | Typical | Because |
|---|---|---|
| **steps** | 10 to 25 | stops the retry loop |
| **tokens** | per run and per day | stops the expensive run |
| **wall clock** | 2 to 5 minutes | stops the hung tool |
| **tool calls per tool** | 3 to 5 | stops one tool being hammered |

```ts
const result = await generateText({
  model, tools, messages,
  stopWhen: [isStepCount(15), hasToolCall("submitAnswer")],
  abortSignal: AbortSignal.timeout(180_000),
  prepareStep: ({ stepNumber, steps }) => {
    const used = steps.reduce((n, s) => n + s.usage.totalTokens, 0)
    if (used > 200_000) throw new BudgetExceeded(used)
    if (stepNumber > 8) return { activeTools: ["submitAnswer"] }
  },
})
```

- **`prepareStep` runs before every step**, which makes it the place for a running budget check
- Narrowing `activeTools` late in a run is a useful trick: it forces the agent to conclude rather than keep exploring

### Detecting a loop before the budget does

- **Hash each tool call and its arguments.** The same call three times is a loop, not progress
- Break out and return what is known so far, with a note that it is incomplete. That is far better than an exhausted budget and no answer
- **Log every step**: tool, arguments, result size, tokens. A failed agent run is only debuggable through its transcript
