## Majority quorums, revisited

- Booklet 02 used `W + R > N` to make a read overlap a write. Consensus uses a stricter form: every decision needs a **majority**, more than half of all members, whether they are up or not. Any two majorities share at least one node, so no two conflicting decisions can both be made, and any new leader shares a node with every committed entry (page 6)

| Members N | Majority | Failures tolerated | Note |
|---|---|---|---|
| 3 | 2 | 1 | the smallest useful cluster |
| 4 | 3 | 1 | no better than 3; one more node to lose |
| **5** | 3 | **2** | the Raft paper's typical size |
| 6 | 4 | 2 | no better than 5 |
| 7 | 4 | 3 | rarely worth the slower commits |

- Even counts buy nothing; the majority rounds up. Each added member is one more disk write and one more reply before every commit, so five is where most deployments stop
- The majority is counted over the configured membership, not over the nodes currently up. Three of five down is a halt, not a smaller cluster. Membership changes go through the log one node at a time; changing two at once can create two disjoint majorities, one per configuration

### The failure

- Five members in two data centres, three and two. Losing the three-node site loses the majority, and the surviving two cannot elect or commit: the cluster is down although two healthy nodes remain. Three sites, or accept that the two-node site is a read replica, never a survivor
