## Making it faster

- The thirty-minute rebuild is the baseline. Each of these trades money for minutes

| Technique | Recovery | Ongoing cost |
|---|---|---|
| Rebuild from scratch | 30 min | Nothing |
| Provider snapshot, restored to a new box | 10 min | A few dollars a month |
| A second box, stopped, kept updated | 5 min | Half price while stopped |
| A second box running, DNS failover | 2 min | Double |
| Managed database plus a stateless box | 15 min, no data restore | Database hosting |

### Snapshots

```bash
# most providers expose this through their API or panel
# snapshot nightly, keep 7
```

- A snapshot restores the whole machine including the data at that moment. **Faster than a rebuild and tied to that provider.** If the account is suspended, the snapshot is suspended with it
- Use snapshots as the fast path and restic as the one that survives losing the provider

### Reducing the DNS wait to zero

- A **floating IP**, offered by most providers, can be reassigned between servers in seconds with no DNS change
- This removes the single largest fixed cost in the timeline

### The cheapest real improvement

- **Lower the TTL to 300 and keep it there.** It costs nothing and removes up to an hour
- Second: hourly database dumps instead of nightly. RPO drops from 24 hours to 1

### What not to do

- Do not build automated multi-region failover for a single-box application. The failover machinery becomes the thing most likely to cause an outage
- Rehearse the manual rebuild until it is boring. That is worth more than automation nobody has tested
