## Contract Net: a worked allocation

- Trace the Contract Net Protocol (16-05) on a concrete task, so the bidding mechanism is unambiguous. A manager must get a data-analysis task done by one of three worker agents. **[VERIFY — illustrative]**

:::mint
```text
1 ANNOUNCE  manager → all:
   "Task: analyze sales.csv, find the top-3 regions by growth.
    Needs: data tools. Deadline: 60s. Who can do it?"

2 BID       worker responses:
   analyst-A: {can: yes, confidence: 0.9, est: 20s, cost: $0.04}
   analyst-B: {can: yes, confidence: 0.6, est: 15s, cost: $0.02}
   writer-C : {can: no}                     # not suited, abstains

3 AWARD     manager scores bids (confidence high, cost/time low):
   → award to analyst-A (0.9 confidence wins over B's 0.6)

4 REPORT    analyst-A → manager:
   "Top-3: West +18%, Southeast +12%, Midwest +9%. [table]"
```
:::

- **Read the mechanism:** the manager did not *guess* who was best — it *announced* the need, let candidates *self-assess* and bid, and *awarded* on the bids. `writer-C` correctly abstained (not suited), and the manager chose `analyst-A` over the cheaper `analyst-B` because confidence mattered more than a 2-cent saving for this task.
- **The scoring is where policy lives.** The manager weighs bid dimensions — confidence, cost, time, past reliability — by what the task values. A cost-sensitive task might pick `analyst-B`; a quality-critical one picks `analyst-A`. You encode the tradeoff in the award function.
- **Why it beats static assignment:** if `analyst-A` were busy (bidding unavailable or high cost) the task routes to `B` automatically — the protocol *load-balances* and *adapts* to who is free and capable *right now*, with no hard-coded routing table.

:::interview
**"Walk through Contract Net on a real task."** The manager announces the task and requirements; each capable agent bids with its self-assessed fit (confidence, cost, time) and unsuited agents abstain; the manager scores the bids by what the task values and awards to the best; the winner does the work and reports. If the chosen agent were busy, work auto-routes to the next-best bidder. The award function encodes the cost-vs-quality tradeoff, and the whole thing load-balances without a hard-coded assignment table.
:::
