## Majority quorum

- To prevent split-brain, a node cannot simply declare itself the Leader. It must be *elected* by the other nodes. And to be elected, it must secure a **Majority Quorum** ($N/2 + 1$ votes)
- If the network splits, only the side of the partition that contains the majority of the nodes is allowed to elect a Leader. The minority side knows it is cut off, and actively refuses to accept writes

| Total Nodes ($N$) | Quorum Size ($N/2 + 1$) | Tolerated Failures |
|---|---|---|
| 1 | 1 | 0 |
| **2** | **2** | **0** (If 1 dies, you only have 1 vote. You cannot reach the quorum of 2. Cluster stops.) |
| **3** | **2** | **1** (If 1 dies, you have 2 votes. Quorum reached. Cluster survives.) |
| **4** | **3** | **1** (If 1 dies, you have 3 votes. Quorum reached. Same as 3 nodes!) |
| **5** | **3** | **2** (If 2 die, you have 3 votes. Quorum reached.) |

- This math is why distributed clusters (like ZooKeeper, Kafka, or Elasticsearch) are **always deployed in odd numbers: 3, 5, or 7**.

### The failure

- Adding a 4th node to increase reliability. If you have a 3-node cluster, you can survive 1 failure (Quorum is 2). If you add a 4th node to make it "more reliable", your Quorum size jumps to 3. If you lose two nodes, you only have 2 votes left, so the cluster shuts down. A 4-node cluster can still only survive 1 failure, but you have added a 4th machine that might crash! You have actually *decreased* your reliability
