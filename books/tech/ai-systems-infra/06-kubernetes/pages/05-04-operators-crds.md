## Operators and CRDs

- Kubernetes lets you add **your own object types** to its API, then run **your own reconcile loop** over them. This is how the ecosystem extends Kubernetes without forking it — and it's the deepest "it's all the same loop" payoff of Module 1.
- **CRD — CustomResourceDefinition** — registers a new **kind** (say `PostgresCluster`) with the API server. Now `kubectl get postgresclusters` works, objects are validated and stored in etcd, and RBAC applies — all the API machinery, for a type you invented. A CRD alone is just **data**: it stores a spec but nothing acts on it.
- **Operator** — a **custom controller** that watches your CRD and runs the reconcile loop to make it real. You declare a `PostgresCluster` with `replicas: 3, version: 17`; the operator creates the StatefulSet, configures replication, takes backups, and — the real value — **handles failover and upgrades automatically**, because its author encoded a DBA's operational knowledge into the loop.

<svg viewBox="0 0 360 84" role="img" aria-label="A CRD registers a new kind; a user creates a custom resource; the operator watches it and reconciles the underlying StatefulSet, backups and failover to match the spec" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="30" width="96" height="26" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="56" y="42" text-anchor="middle" font-size="5.8">PostgresCluster</text><text x="56" y="51" text-anchor="middle" font-size="4.8" fill="#777">custom resource (spec)</text>
  <rect x="134" y="30" width="86" height="26" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="177" y="42" text-anchor="middle" font-size="6">operator</text><text x="177" y="51" text-anchor="middle" font-size="4.8" fill="#777">watch · reconcile</text>
  <rect x="250" y="12" width="102" height="18" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="301" y="24" text-anchor="middle" font-size="5.6">StatefulSet + PVCs</text>
  <rect x="250" y="34" width="102" height="18" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="301" y="46" text-anchor="middle" font-size="5.6">backups · failover</text>
  <rect x="250" y="56" width="102" height="18" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="301" y="68" text-anchor="middle" font-size="5.6">version upgrades</text>
  <path d="M104 43 L134 43" stroke="#1a1a1a" marker-end="url(#op)"/><path d="M220 40 L250 21" stroke="#999" marker-end="url(#op)"/><path d="M220 43 L250 43" stroke="#999" marker-end="url(#op)"/><path d="M220 46 L250 65" stroke="#999" marker-end="url(#op)"/>
  <defs><marker id="op" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **Why operators are written in Go.** The reconcile loop needs to **watch** the API with an informer cache (don't poll — get change events), handle retries with backoff, and manage owner references and finalizers. The **controller-runtime** library (the Kubebuilder/Operator SDK base) packages all of that, and it's Go — the same language and client as Kubernetes itself. You *can* write a controller in any language, but the batteries-included path is Go, which is why "operators are Go" (and why K8s itself is Go) keeps coming up.

:::note
You meet operators constantly as a *user* before you ever write one: cert-manager (a `Certificate` CRD), Prometheus Operator (`ServiceMonitor`), Argo CD (`Application`), the NVIDIA GPU operator (Booklet 9), and llm-d (Booklet 10) are all CRDs + controllers. The mental model that unlocks the whole ecosystem: **a CRD is a new noun, an operator is the verb that makes it true**, and both run the Module 1 loop. When off-the-shelf objects can't express your operational logic, you reach for this — not for a bash script cron'd outside the cluster.
:::
