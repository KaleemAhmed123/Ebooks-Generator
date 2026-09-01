## Tools for running evaluations

- The last two pages describe evaluations as a concept. In practice you either build a small runner or adopt one

| Tool | Is | Fits |
|---|---|---|
| **Vitest plus a JSON file** | what you already have | a first set, and most teams |
| **Evalite** | a local evaluation runner on Vitest | watching scores while iterating |
| **LangSmith** | tracing plus datasets, hosted | already using LangChain |
| **Braintrust** | evaluations, datasets, comparison, hosted | a team comparing many versions |
| **Provider consoles** | built-in evaluation and prompt tools | staying on one provider |

```ts
// the version worth starting with
describe("triage", () => {
  it("classifies at least 90 percent of the set", async () => {
    const scores = await Promise.all(cases.map(score))
    const rate = scores.filter(Boolean).length / scores.length
    console.table({ rate, n: scores.length })
    expect(rate).toBeGreaterThan(0.9)
  })
})
```

### What a hosted tool adds

- **Comparison across runs**, so a prompt change shows as a diff per case rather than one number
- **A dataset that non-engineers can edit**, which is what lets a support lead add the case they care about
- **Tracing joined to evaluations**, so a failing case opens the exact transcript

### The rule

- **Do not shop for a tool before you have twenty cases.** The set is the asset and it is portable; the runner is not
- Keep the cases in your repository as plain JSON, whatever runs them. A dataset that only lives in a vendor is a dataset you will lose
