## Synchronous commit

- In default Postgres, the leader commits to its own disk and replies "Success". If the leader catches fire a millisecond later, any write that hadn't yet reached a follower is gone forever
- You can prevent this data loss by changing `synchronous_commit`. By making replication synchronous, the leader refuses to reply "Success" until the followers confirm they have the data

| `synchronous_commit` | What the leader waits for | Durability |
|---|---|---|
| `off` | Leader hasn't even flushed its own WAL. | ❌ Power loss = data loss. |
| `local` | Leader flushed its own WAL to disk. | ❌ Datacenter fire = data loss. |
| `on` (Default) | Followers flushed the WAL to disk. | ✅ Safe. Leader dies, followers have it. |
| `remote_apply` | Followers applied the WAL to their B-trees. | ✅ No read-your-writes anomaly. |

- **Quorum sync**: Waiting for every single follower is dangerous. If one follower drops off the network, the leader halts all writes cluster-wide waiting for it. Postgres fixes this using `ANY num_sync (...)`, which requires only a quorum (e.g., any 2 out of 3 followers) to acknowledge the write

### The failure

- Turning on `remote_apply` to guarantee strongly consistent reads, without understanding the cost. You have forced the write path (the leader) to wait for the read path (the follower's B-tree insertion). Your write latency will spike dramatically, dictated entirely by the slowest follower
