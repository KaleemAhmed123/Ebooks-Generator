### The parameter that is not optional in production

- **`max_iterations` is the budget.** Without a cap, a model that keeps retrying a failing tool will loop until the money runs out
- Ten is a reasonable ceiling for a support agent. A coding agent needs more, and it needs the cost logged per run

### When to skip the helper

- When a tool needs approval before it runs, or when the loop must survive a process restart
- Both mean owning the loop yourself, and Module 8 builds exactly that
