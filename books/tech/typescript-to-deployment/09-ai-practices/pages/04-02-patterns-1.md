## The patterns that work

### Point at an example

```text
Add a /payouts endpoint following the exact structure of routes/orders.ts.
```

- **The highest-value sentence in this booklet.** It transfers every convention at once without describing any of them

### State the interface first

```text
Implement this signature. Do not change it.
async function schedulePayoutRetry(payoutId: string, attempt: number): Promise<Date | null>
```

- Fixing the boundary means the change cannot spread outward through callers

### Ask for the smallest version

```text
Smallest change that makes this test pass. No new files, no new abstractions.
```

- Left alone it will build a factory, an interface and a config option. **Asking for less produces better code**, and it is easier to review

### Give it the error, in full

```text
This fails with: <paste the whole stack trace and the command you ran>
Find the root cause. Do not add a try/catch around it.
```

- **"Do not add a try/catch" is necessary.** Suppressing the symptom is the default move, and it is almost never the fix
