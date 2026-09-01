## Measuring whether it helps

- The claims are large and the evidence is mixed. **The only honest answer for your team is your own measurements**

### What not to measure

| Metric | Why it is wrong |
|---|---|
| lines of code | more lines is worse, not better |
| percentage of code written by AI | a target that changes behavior immediately |
| pull requests opened | measures generation, not delivery |
| individual output | encourages volume over quality |

### What to measure

- **Delivery, not generation.** The DORA four are still the baseline: deployment frequency, lead time, change failure rate, time to restore
- **Change failure rate is the one to watch closest.** If it rises while throughput rises, the throughput is borrowed and will be repaid
- **Review time and queue depth**, because that is where the bottleneck moved
- **Rework rate**: how often a change is reverted or immediately fixed

### The published caveat

- **DORA alone is not sufficient once a large share of code is generated.** It cannot distinguish a real improvement from a quality trade-off that has not surfaced yet
- Pair it with a quality signal, an adoption signal, and a cost signal. The measurement frameworks built for this all say the same thing

### The qualitative half, which matters as much

- **Ask the team every quarter**: does this help, where does it get in the way, what do you not trust it with
- **Watch for the signals from the last three pages**: understanding draining, juniors not developing, reviews becoming approvals

### The honest position

- **Large individual gains, smaller organizational gains, and a real quality risk if the gates are missing.** Every serious study lands somewhere near that, and a team's job is to be on the good side of it
