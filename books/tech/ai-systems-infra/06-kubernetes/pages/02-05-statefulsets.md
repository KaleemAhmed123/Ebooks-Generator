## StatefulSets

- Deployments treat pods as **interchangeable** — any pod serves any request, names and storage don't matter. Databases, queues, and consensus clusters (Booklets 3–4) need the opposite: a **stable identity** and **its own data** that survives a restart. A **StatefulSet** provides three guarantees a Deployment can't.
- **Stable network identity.** Pods are named by **ordinal** — `db-0`, `db-1`, `db-2` — not a random suffix, and each keeps its name across restarts. Paired with a **headless Service** (Module 2.3), each pod gets its own stable DNS name (`db-0.db.ns.svc`), so peers can address a specific member — exactly what leader election and replication need.
- **Stable storage.** A `volumeClaimTemplate` gives **each** pod its *own* PersistentVolumeClaim (Module 4), and `db-1`'s volume re-attaches to the *new* `db-1` if it's rescheduled. The data follows the identity, not the pod process.
- **Ordered operations.** Pods are created `0,1,2…` and removed in reverse; a rolling update goes one pod at a time, highest ordinal first, waiting for each to be Ready. This matters when members must join a quorum in order.

<svg viewBox="0 0 360 80" role="img" aria-label="A StatefulSet gives each pod a stable ordinal name, its own persistent volume that re-attaches on reschedule, and a stable DNS name via a headless service" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="180" y="12" text-anchor="middle" font-size="6.2" fill="#2a5db0">StatefulSet: db  (headless Service db)</text>
  <rect x="16" y="22" width="100" height="24" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="66" y="37" text-anchor="middle" font-size="6">db-0</text>
  <rect x="130" y="22" width="100" height="24" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="180" y="37" text-anchor="middle" font-size="6">db-1</text>
  <rect x="244" y="22" width="100" height="24" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="294" y="37" text-anchor="middle" font-size="6">db-2</text>
  <rect x="16" y="54" width="100" height="18" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="66" y="66" text-anchor="middle" font-size="5.6">PVC pvc-db-0</text>
  <rect x="130" y="54" width="100" height="18" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="180" y="66" text-anchor="middle" font-size="5.6">PVC pvc-db-1</text>
  <rect x="244" y="54" width="100" height="18" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="294" y="66" text-anchor="middle" font-size="5.6">PVC pvc-db-2</text>
  <path d="M66 46 L66 54" stroke="#2f7d4f"/><path d="M180 46 L180 54" stroke="#2f7d4f"/><path d="M294 46 L294 54" stroke="#2f7d4f"/>
</svg>

- **When you actually need one:** the workload has per-instance identity or per-instance disk — a database, Kafka, etcd, a sharded cache. **When you don't:** a stateless web/API tier, or anything whose state lives in an *external* managed store (RDS, DynamoDB — Booklet 5). The honest default for application teams is **run stateful data outside the cluster** and keep the cluster stateless; reach for a StatefulSet (or better, an operator — Module 5) only when you must run the datastore *in* Kubernetes.

:::warn
Deleting a StatefulSet (or scaling it down) **does not delete its PVCs** by default — the data is kept deliberately, so a recreated `db-0` re-adopts its old volume. The flip side: orphaned PVCs quietly accumulate cost until someone prunes them. And scaling a stateful datastore is rarely "just raise `replicas`" — adding a member usually needs the datastore's own join/rebalance (Booklet 4), which is exactly what operators automate.
:::
