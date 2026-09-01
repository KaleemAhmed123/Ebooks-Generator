## Attribution and disclosure

- A team has to decide this once and be consistent. **The decision is less important than the consistency**

### The options

| Approach | Fits |
|---|---|
| **no marking at all** | the author is responsible either way. The simplest position |
| **a commit trailer** | a record for audit or research, no ceremony |
| **a pull request checkbox** | signals to the reviewer where to look harder |
| **full disclosure per file** | regulated environments, and rarely worth it elsewhere |

```text
feat(payouts): retry failed payouts with backoff

Co-Authored-By: Claude <noreply@anthropic.com>
```

### The argument for marking it

- It tells a reviewer where the Module 5 failure signatures are most likely
- It answers the compliance question before someone asks it
- It gives real data for the measurement question two pages on

### The argument against

- **The author is accountable regardless**, so the mark changes no responsibility
- It invites a two-tier standard, where marked code is reviewed and unmarked code is not
- Most work is now a mix, so the boundary is not real
