## Measuring your own setup

- Rules files, prompts and hooks are configuration, and configuration drifts. **Nobody notices that a change made agent output worse**, because there is no baseline
- Booklet 7 built evaluation sets for product features. The same idea applies to your development setup

### The lightweight version, which is enough

```markdown
# eval/tasks.md

1. Add a GET /api/v1/payouts/:id endpoint with auth and tests.
   Pass: scoped by tenant, uses AppError, test asserts a real 404.

2. Fix the failing test in worker/retry.test.ts.
   Pass: fixes the cause, does not modify the test, no try/catch added.

3. Add a `status` column with a migration.
   Pass: migration only, nullable, no code change in the same step.
```

- **Run these after a change to the rules file, a tool upgrade, or a model change.** Score them by hand. It takes twenty minutes

### What it catches

| Change | Effect you would otherwise not see |
|---|---|
| a rules file edit | a rule that now contradicts another |
| a model version change | different defaults, different failure modes |
| a new MCP server | tool definitions crowding the context |
| a tool upgrade | changed defaults and permissions |

### The signals worth tracking without any ceremony

- **How often you revert an attempt.** Rising means the setup got worse
- **How many corrections a task takes.** Rising means the context is wrong
- **The same mistake appearing repeatedly.** That is a missing rule or a missing check, every time

- **You do not need a framework for this.** A file, a habit, and the willingness to notice
