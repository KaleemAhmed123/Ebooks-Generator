## ReplicaSets and Deployments

- A **ReplicaSet** is the controller that keeps **N identical pods** running: its spec says "3 pods matching this template," and its loop creates or deletes pods until actual = 3. You rarely touch it directly. You create a **Deployment**, which manages ReplicaSets *for you* to give you **rollouts and rollbacks**.
- The mechanism of a rolling update: changing the pod template (e.g. a new image tag) makes the Deployment create a **new ReplicaSet** and then **shift replicas** — scale the new one up and the old one down, a few pods at a time, honouring `maxSurge` (how many extra pods allowed) and `maxUnavailable` (how many may be missing). Traffic keeps flowing the whole time because readiness probes (Module 3) gate when a new pod joins.

<svg viewBox="0 0 360 98" role="img" aria-label="A Deployment manages two ReplicaSets during a rollout: the old ReplicaSet scales from 3 to 0 while the new one scales from 0 to 3, a few pods at a time" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="120" y="6" width="120" height="18" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="180" y="18" text-anchor="middle">Deployment: api  v2</text>
  <rect x="20" y="40" width="140" height="48" rx="4" fill="#f7f9fc" stroke="#999"/><text x="90" y="52" text-anchor="middle" font-size="6.2" fill="#777">ReplicaSet v1 (old)</text>
  <text x="90" y="70" text-anchor="middle" font-size="6">3 → 2 → 1 → 0</text><text x="90" y="82" text-anchor="middle" font-size="5.2" fill="#777">scaling down</text>
  <rect x="200" y="40" width="140" height="48" rx="4" fill="#eaf1fb" stroke="#2a5db0"/><text x="270" y="52" text-anchor="middle" font-size="6.2" fill="#2a5db0">ReplicaSet v2 (new)</text>
  <text x="270" y="70" text-anchor="middle" font-size="6">0 → 1 → 2 → 3</text><text x="270" y="82" text-anchor="middle" font-size="5.2" fill="#777">scaling up</text>
  <path d="M160 30 L90 40" stroke="#999" marker-end="url(#d2)"/><path d="M200 30 L270 40" stroke="#1a1a1a" marker-end="url(#d2)"/>
  <defs><marker id="d2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **Rollback is free** because the old ReplicaSet is kept (at 0 replicas) in its revision history: `kubectl rollout undo` scales the previous ReplicaSet back up. There was no "undo script" — rolling back is just the reconcile loop pointed at the old template.
- Watch a rollout with `kubectl rollout status deploy/api`; a stuck one (new pods never go Ready) **pauses automatically** rather than tearing down the old pods — the old version keeps serving. This is the safety that a bare `docker run` replacement never gives you.

:::interview
**What actually happens, step by step, when you `kubectl set image` on a Deployment?**

The API server persists the new pod template into the Deployment's spec. The Deployment controller notices spec ≠ status, creates a new ReplicaSet for the new template, and begins shifting replicas: it scales the new ReplicaSet up within `maxSurge` and the old one down within `maxUnavailable`, waiting at each step for new pods to pass their readiness probe before continuing. If new pods never become Ready, the rollout stalls with the old pods still serving; `rollout undo` points back at the previous ReplicaSet. No step is imperative — each is the loop closing a gap.
:::
