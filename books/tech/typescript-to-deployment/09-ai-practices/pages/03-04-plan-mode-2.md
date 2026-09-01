### Correct the plan, not the code

```text
Two changes. Do not create a new PayoutRetryService, put the logic in the
existing worker. Do not add p-retry, we already have backoff in shared/retry.ts.
```

- **Two sentences at the plan stage replaces a large rejected diff**

### The rule

- **Anything above a small change gets a plan first.** For a one-line fix, planning is overhead and skipping it is correct
- **A plan you agreed to is also a review aid.** The diff either matches it or it does not, and that comparison is much faster than reading cold
