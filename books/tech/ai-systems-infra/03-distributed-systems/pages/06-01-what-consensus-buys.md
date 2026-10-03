# Consensus

## What consensus buys you

- **Consensus** is getting a group of nodes to **agree on one value** — or, more usefully, on an **ordered sequence of values** — even though nodes crash and messages are lost. It is the single primitive that makes **CP** systems (Module 5) possible, and almost everything hard in distributed systems reduces to it.
- What you actually use it for is always one of these:
  - **Agree who is the leader** — so failover (Module 3) promotes exactly one node, not two (no split-brain).
  - **Agree the next entry in a replicated log** — so every replica applies the same operations in the same order (a replicated state machine).
  - **Agree a configuration change** — membership, locks, feature flags — atomically.
- The guarantees a consensus protocol provides: every non-faulty node decides the **same** value; it's a value someone actually **proposed** (not invented); and, given enough network stability (partial synchrony, Module 1), it **eventually** decides. The price is a **majority must be alive and reachable** — lose the majority and the system correctly **stops** rather than risk disagreement.

:::note
You almost never implement consensus; you **use** it. **etcd** and **ZooKeeper** are consensus-as-a-service: small, strongly-consistent stores other systems lean on for leader election, locks, and config. **Kubernetes keeps its entire cluster state in etcd** — every object you `kubectl apply` is a committed entry in a consensus log. When people say "the control plane," this is its beating heart. Learn the one algorithm behind it (Raft, next) and the whole CP world stops being mysterious.
:::
