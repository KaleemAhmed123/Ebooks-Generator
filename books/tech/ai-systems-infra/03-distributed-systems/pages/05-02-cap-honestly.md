## CAP, honestly

- **CAP** is the most quoted and most misunderstood result in the field. The honest statement: **when a network partition splits your nodes, you must choose between Consistency and Availability — you cannot have both.** That's it. It is *not* "pick 2 of 3."
- Why "pick 2 of 3" is wrong: **P (partition tolerance) is not optional.** Networks *will* partition — a switch fails, a link saturates, an AZ is cut off. A distributed system that isn't partition-tolerant just means "breaks when the network hiccups," which no one chooses. So **P is a given**, and the real choice is the one you make **during** a partition: **C or A**.

<svg viewBox="0 0 360 86" role="img" aria-label="A network partition splits the cluster into two sides; a CP system refuses writes on the minority side to stay consistent, an AP system keeps accepting writes on both sides and reconciles later" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="24" y="22" width="120" height="48" rx="4" fill="#eef2f8" stroke="#1f487e"/><text x="84" y="16" text-anchor="middle" font-size="6" fill="#1f487e">majority side</text><text x="84" y="40" text-anchor="middle" font-size="6">N1  N2</text>
  <rect x="216" y="22" width="120" height="48" rx="4" fill="#eef2f8" stroke="#1f487e"/><text x="276" y="16" text-anchor="middle" font-size="6" fill="#1f487e">minority side</text><text x="276" y="40" text-anchor="middle" font-size="6">N3</text>
  <line x1="168" y1="14" x2="192" y2="78" stroke="#c0392b" stroke-width="2" stroke-dasharray="4 3"/><text x="180" y="82" text-anchor="middle" font-size="5.6" fill="#c0392b">partition</text>
  <text x="84" y="58" text-anchor="middle" font-size="5.4" fill="#777">CP: only this side writes</text>
  <text x="276" y="58" text-anchor="middle" font-size="5.4" fill="#777">CP: refuses · AP: still writes</text>
</svg>

- The two camps, made concrete:
  - **CP (choose Consistency)** — during a partition, the side that can't guarantee it has the latest data **refuses to serve** (errors or blocks) rather than return stale/divergent results. **etcd, ZooKeeper, Spanner, HBase.** You get correctness; you give up availability on the minority side. This is right for anything where a wrong answer is worse than no answer — config, leader election, account balances.
  - **AP (choose Availability)** — during a partition, **every** side keeps serving reads and writes, accepting that replicas diverge, and **reconciles afterward** (Module 3's conflict resolution). **DynamoDB, Cassandra.** Right for carts, feeds, metrics — where staying up matters more than momentary disagreement.
- The interview-grade framing: **CAP only says anything during a partition.** The rest of the time — the overwhelming majority of the time — you can have both C and A, and the trade that actually governs your p99 is the one on the next page.
