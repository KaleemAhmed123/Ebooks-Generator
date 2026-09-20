## Reading from Raft

- A leader's local state is not a linearizable read by itself. The leader may have been deposed and not know it yet; a newer leader may have committed writes this one has never seen. Serving the read from memory returns the past
- Two ways to make it safe. **ReadIndex**: the leader notes its commit index, exchanges a heartbeat with a majority to confirm it still leads, waits until its state machine has applied up to that index, then answers. One round-trip, no disk write. **Lease**: the leader assumes it still leads for a bounded time after its last majority heartbeat, and answers from memory within that window. No round-trip, but it trusts clocks not to drift past the bound (Module 9)
- A brand-new leader must first commit an entry of its own term before it can serve any read; until then it does not know its commit index is current (page 6)

| Read | Path | Guarantee | Cost |
|---|---|---|---|
| etcd default (`linearizable`) | leader, ReadIndex | linearizable: sees every committed write | one majority round-trip per read |
| etcd `--consistency=s` (`serializable`) | any member, local state | may be stale; own writes still in order | none: local |
| ZooKeeper read | the connected server | sequentially consistent, may be stale (Module 5, page 6) | none; `sync()` first to make it current |
| follower read, no protocol | a follower's state | none: an entry can be applied on the leader seconds earlier | none |

- etcd's word for its stale option, "serializable", is the name of the wrong axis (Module 6, page 5). It means "consistent with the log order on this node", not "fresh"

### The failure

- "We read from the leader, so it is safe." A leader that lost the network to the other nodes 900 ms ago is still a leader in its own state. With a 1000 ms election timeout the others have not replaced it yet, but they will, and a client that read the old leader's memory a second later sees data the cluster has moved past
