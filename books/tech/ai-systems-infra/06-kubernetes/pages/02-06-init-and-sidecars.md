## Init and sidecar containers

- A pod can run helper containers around its main app, and the **lifecycle** rules are the whole point.
- **Init containers** run **to completion, in order, before** any app container starts. Each must exit 0 before the next begins; if one fails, the pod restarts it. They share the pod's volumes and network, so they're ideal for one-time setup: run a schema migration, fetch config/secrets, wait for a dependency to be reachable. The app never starts until setup succeeded.
- **Sidecars** run *alongside* the app for the pod's whole life — a log shipper, a metrics exporter, a service-mesh proxy (Booklet 11). The old way (just adding an extra container) had two real bugs: the sidecar had **no ordering** (the app could start before the mesh proxy was ready and lose early requests), and in a **Job**, a sidecar that never exits keeps the pod "running" forever so the Job never completes.

<svg viewBox="0 0 360 86" role="img" aria-label="Timeline: init containers run and finish first, then the native sidecar starts and stays up before the app, the app runs, and on shutdown the app stops before the sidecar" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="12" y1="70" x2="348" y2="70" stroke="#999"/><text x="12" y="80" font-size="5.4" fill="#777">pod start</text><text x="348" y="80" text-anchor="end" font-size="5.4" fill="#777">pod stop</text>
  <rect x="16" y="46" width="60" height="16" rx="2" fill="#f3f7fc" stroke="#2a5db0"/><text x="46" y="57" text-anchor="middle" font-size="5.6">init (→exit)</text>
  <rect x="84" y="28" width="236" height="16" rx="2" fill="#dde9f8" stroke="#2a5db0"/><text x="202" y="39" text-anchor="middle" font-size="5.8">sidecar (restartPolicy: Always) — up first, down last</text>
  <rect x="104" y="46" width="200" height="16" rx="2" fill="#fff" stroke="#888"/><text x="204" y="57" text-anchor="middle" font-size="5.8">app container</text>
  <path d="M84 36 L84 70" stroke="#2a5db0" stroke-dasharray="2 2"/><path d="M104 54 L104 70" stroke="#888" stroke-dasharray="2 2"/>
</svg>

- **Native sidecars** fix both, and are **stable since Kubernetes 1.33**. The mechanism is elegant: a sidecar is declared as an **init container with `restartPolicy: Always`**. Because it's an init container it **starts before** the app (and the app waits for it to be Ready); because its restart policy is Always it **keeps running** alongside the app instead of exiting; and on shutdown it is stopped **after** the app. In a Job, native sidecars are ignored for completion, so the Job finishes when the app container does.

### Module 2 — checkpoint
- **Key concepts:** pod = co-scheduled containers sharing net/IPC/volumes + one IP (pause container) · **Deployment → ReplicaSet → pods**, rolling update = new RS up / old RS down, rollback = old RS kept · **Service** = stable VIP + selector → EndpointSlice (ClusterIP/NodePort/LoadBalancer/headless) · **Job/CronJob/DaemonSet** for completion/schedule/per-node · **StatefulSet** for stable identity+storage · **init** (run-first) vs **native sidecars** (init container, `restartPolicy: Always`, stable 1.33).
- **Task + questions:** write a Deployment + ClusterIP Service, roll out a bad image, watch it stall, `rollout undo`. Why does a bare pod not survive a node failure but a Deployment's pod does? When is a StatefulSet wrong?
- **Next:** Module 3 — config, health, and scheduling (how pods get placed and stay alive).
