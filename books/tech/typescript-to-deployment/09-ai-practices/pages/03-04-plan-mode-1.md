## Reviewing the plan, not the diff

- **The cheapest place to catch a wrong approach is before any code exists.** Most tools now have a mode that plans without editing
- The habit is small and the payoff is large: ask for the plan, read it, correct it, then let it build

```text
Before writing anything, give me:
- the approach, and one alternative you rejected and why
- every file you will create or change
- the order of the steps
- anything you are unsure about

Do not edit any file until I say go.
```

### What to look for in a plan

| Signal | Means |
|---|---|
| **a file you did not expect** | it misunderstood the boundary |
| **a new abstraction** | usually unnecessary. Ask why |
| **a new dependency** | almost always ask why |
| **no tests mentioned** | it will not write them |
| **a schema change you did not ask for** | stop and discuss |
| **"and update all callers"** | the change is larger than you thought |
