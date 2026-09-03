## ADR

*Architecture Decision Record*

A short file recording one decision and the forces behind it. Nygard's form has
four parts — context, decision, status, consequences — and is blunt about the
last: "All consequences should be listed here, not just the 'positive' ones."

| Status | Means |
|---|---|
| `proposed` | written, not yet agreed |
| `accepted` | agreed; the file stops changing |
| `superseded` | reversed by a later ADR, which it links to |

**An ADR nobody reads is worse than none.** It presents a decision as settled
while the code has drifted elsewhere, and the next engineer inherits the drift
as if it were deliberate.

## Amdahl's Law

The ceiling on what parallelism can buy you. With fraction `p` of the work
parallelisable across `N` workers, speedup is `1 / ((1 - p) + p/N)`.

As `N` grows, `p/N` vanishes and speedup approaches `1 / (1 - p)` — the serial
remainder sets the limit, not the worker count.

| Parallel fraction | Ceiling at any worker count |
|---|---|
| 90% | 10x |
| 95% | 20x |
| 99% | 100x |

**The serial fraction is rarely in the code you are optimising.** It is the
single-writer table, the startup config fetch, the one mutex everything queues
behind — the parts nobody measured because they looked instantaneous.
