## Failure recovery

- The reconcile loop (Module 1) is also the recovery mechanism — when something dies, the gap between desired and actual reopens, and controllers close it. Knowing the **sequence and timing** is what lets you reason about an outage instead of guessing.
- **A node dies.** The kubelet stops sending heartbeats. The **node controller** marks the node `NotReady` after a grace period, then applies a `NotReady:NoExecute` **taint**. Pods on it are **evicted after `tolerationSeconds`** (default **300s** — five minutes), at which point their controllers (Deployment/StatefulSet) recreate them elsewhere. The lag is deliberate: evict too fast and a brief network blip triggers a needless reschedule storm; too slow and capacity sits dead.

<svg viewBox="0 0 360 76" role="img" aria-label="Timeline after a node fails: heartbeats stop, the node is marked NotReady, a NoExecute taint is applied, and after the toleration seconds pods are evicted and rescheduled on healthy nodes" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="12" y1="48" x2="348" y2="48" stroke="#999"/>
  <circle cx="30" cy="48" r="3" fill="#c0392b"/><text x="30" y="40" text-anchor="middle" font-size="5.4">heartbeat stops</text>
  <circle cx="130" cy="48" r="3" fill="#b8860b"/><text x="130" y="40" text-anchor="middle" font-size="5.4">NotReady + taint</text>
  <circle cx="270" cy="48" r="3" fill="#2f7d4f"/><text x="270" y="40" text-anchor="middle" font-size="5.4">evict → reschedule</text>
  <text x="200" y="64" text-anchor="middle" font-size="5.4" fill="#777">~default 300s tolerationSeconds before eviction</text>
</svg>

- **What comes back and what doesn't.** Controller-owned pods (Deployment, StatefulSet, DaemonSet) are recreated; a **bare pod** is gone for good (Module 2.1). A StatefulSet pod's **PVC re-attaches** to its replacement — but a `ReadWriteOnce` volume (Module 4.4) can only move once the old node truly releases it, so a *stuck* (not dead) node can block a stateful pod from restarting elsewhere until it's fenced. Stateless replicas with anti-affinity and a PDB (Module 3) ride through a node loss with only a capacity dip.
- **The control plane** fails differently: if the **API server/etcd** is down, **running pods keep running** (the kubelet and kube-proxy already have their state), but you **can't deploy, scale, or self-heal** — no new reconciliation happens. This is why etcd runs with **3 or 5 members** (Booklet 3's quorum) and why managed control planes (EKS — Booklet 5) are multi-AZ: the data plane surviving a control-plane blip is the whole point of the design.

### Module 6 — checkpoint
- **Key concepts:** rollout strategies — **rolling** (cheap/blunt), **blue-green** (flip, 2× cost), **canary** (ramp + metrics, smallest blast); Gateway API weights + Argo Rollouts/Flagger automate it; migrations must be **backward-compatible** · debug by **status → `describe` Events → `logs --previous`**: Pending (unschedulable) / ImagePull / CrashLoop (exit code) / OOMKilled / Running-not-Ready (readiness) · node death → NotReady → taint → evict after ~300s → reschedule; control-plane down = pods run but no changes.
- **Task + questions:** break a Deployment three ways (bad image, too-low memory limit, failing readiness) and diagnose each from `describe`; drain a node and watch rescheduling. Why do running pods survive an API-server outage? Why can a stuck node block a StatefulSet pod from moving?
- **Next:** the Booklet close.
