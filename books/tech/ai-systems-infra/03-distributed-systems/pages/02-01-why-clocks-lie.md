# Time and Order

## Why clocks lie

- Each machine keeps time with a cheap quartz oscillator that **drifts** — runs slightly fast or slow. **NTP** (Network Time Protocol) nudges it back toward a reference, but imperfectly: clocks across a fleet routinely disagree by **milliseconds to tens of milliseconds**, and a correction can even step the clock **backwards**. So you cannot trust that machine A's "now" and machine B's "now" agree.
- That makes **comparing wall-clock timestamps across machines to order events unsafe.** If A stamps an event 10:00:00.050 and B stamps one 10:00:00.040, you cannot conclude B's happened first — B's clock might simply be 20 ms behind.

:::warn
**Last-write-wins (LWW) by wall-clock timestamp silently loses data.** Two nodes accept writes to the same key; the system keeps the one with the higher timestamp. If the node that wrote *second in reality* has a clock running 30 ms slow, its (actually newer) write gets a *lower* timestamp and is **discarded** — the older value wins and the newer one vanishes, with no error. Cassandra's LWW and any "newest timestamp wins" scheme has this hazard whenever clocks can skew. The fix is logical clocks (next pages) or an explicit version, not tighter NTP.
:::

- Two more rules that save you:
  - **Use the monotonic clock for durations.** A monotonic clock only ever moves forward and isn't affected by NTP steps; measuring "elapsed time" with the wall clock can yield a **negative duration** when the clock jumps back. Timeouts and latency measurements must use monotonic time.
  - **Physical time can be made trustworthy — at a price.** Google **Spanner's TrueTime** uses GPS and atomic clocks to bound the error to a known interval, then *waits out that uncertainty* before committing, buying real global ordering. It needs special hardware in every datacentre; most systems can't, which is why they reach for **logical** time instead.

- The takeaway: if ordering matters, don't order by the clock. Order by **causality** — what provably happened before what — which is what logical and vector clocks capture next.
