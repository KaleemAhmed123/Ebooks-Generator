## Chains compound latency and failure

- A → B → C → D in series: latencies add, availabilities multiply, and the slowest hop's tail becomes everyone's. Each hop was designed well; the chain was not designed at all, it accumulated

| Chain | Availability (each hop 99.9 %) | Downtime a year | Latency (each hop 50 ms) |
| :--- | :--- | :--- | :--- |
| 1 service | 0.999 = 99.9 % | 8.8 h | 50 ms |
| 2 in series | 0.999² = 99.8 % | 17.5 h | 100 ms |
| 5 in series | 0.999⁵ ≈ 99.5 % | ≈ 44 h | 250 ms |
| 10 in series | 0.999¹⁰ ≈ 99.0 % | ≈ 88 h, 3.7 days | 500 ms |

- The chain is up only when every hop is up, so five hops at 99.9 % deliver 99.5 %, and the top has no hop to blame. Latency adds in the average and worse in the tail: a 2 s pause anywhere is a 2 s request, and the chance that one of five hops is in its 1-in-100 slow moment is 1 − 0.99⁵ ≈ 5 %
- The chain is shortened, not tuned: a hop becomes async (page 1), a local copy fed by events (Module 2, page 6), or part of its caller (Module 2, page 8). Fan-out in parallel replaces the sum with the maximum, and has its own trap (page 4)

:::interview
"Five services in a chain, each at 99.9 %. What does the user get?" — 0.999⁵ ≈ 99.5 %: about 44 hours a year down instead of 9, and the latencies add, so 50 ms hops give a 250 ms floor before the tail. The fix is not 99.99 % per hop; it is fewer hops on the path: async where the caller can proceed, a local copy of what changes rarely, and the rest in parallel so the cost is the slowest, not the sum.
:::

### The failure

- A deep synchronous call graph nobody drew. Each service added one reasonable call; the request now crosses five, the SLO at the top is arithmetically impossible, and the on-call for the top service is paged for every hop below it. Draw the chain once, count the hops, and multiply; the number is the design
