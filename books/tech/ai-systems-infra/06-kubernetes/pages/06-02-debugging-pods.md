## Debugging pods

- Most pod failures announce themselves in the pod's **phase/reason**, and the reason **names the layer** to check. The method is always the same three commands: **`kubectl describe pod`** (read the **Events** at the bottom — the single most useful output), **`kubectl logs`** (`--previous` for a crashed-and-restarted container), and **`kubectl get events`**. The status tells you *where* to look:

<svg viewBox="0 0 360 98" role="img" aria-label="Decision tree from a pod's status: Pending means unschedulable, ImagePullBackOff means a bad image or registry auth, CrashLoopBackOff means the app exits, OOMKilled means it hit the memory limit, Running but not Ready means readiness fails" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="120" y="6" width="120" height="16" rx="3" fill="#dde9f8" stroke="#2a5db0"/><text x="180" y="17" text-anchor="middle" font-size="6">pod status?</text>
  <rect x="4" y="36" width="84" height="26" rx="2" fill="#fdecea" stroke="#c0392b"/><text x="46" y="47" text-anchor="middle" font-size="5.6">Pending</text><text x="46" y="57" text-anchor="middle" font-size="4.8" fill="#777">no node fits</text>
  <rect x="92" y="36" width="84" height="26" rx="2" fill="#fdecea" stroke="#c0392b"/><text x="134" y="47" text-anchor="middle" font-size="5.6">ImagePullBackOff</text><text x="134" y="57" text-anchor="middle" font-size="4.8" fill="#777">bad image/auth</text>
  <rect x="180" y="36" width="84" height="26" rx="2" fill="#fdecea" stroke="#c0392b"/><text x="222" y="47" text-anchor="middle" font-size="5.6">CrashLoopBackOff</text><text x="222" y="57" text-anchor="middle" font-size="4.8" fill="#777">app exits → logs</text>
  <rect x="268" y="36" width="88" height="26" rx="2" fill="#fdecea" stroke="#c0392b"/><text x="312" y="47" text-anchor="middle" font-size="5.6">OOMKilled</text><text x="312" y="57" text-anchor="middle" font-size="4.8" fill="#777">hit mem limit</text>
  <rect x="92" y="72" width="172" height="20" rx="2" fill="#fff8e1" stroke="#b8860b"/><text x="178" y="84" text-anchor="middle" font-size="5.6">Running, not Ready → readiness probe failing / endpoints empty</text>
  <path d="M150 22 L46 36" stroke="#999" marker-end="url(#db)"/><path d="M168 22 L134 36" stroke="#999" marker-end="url(#db)"/><path d="M192 22 L222 36" stroke="#999" marker-end="url(#db)"/><path d="M210 22 L312 36" stroke="#999" marker-end="url(#db)"/>
  <defs><marker id="db" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#999"/></marker></defs>
</svg>

- **Pending** → unschedulable: not enough requestable CPU/memory, a PVC that can't bind, or affinity/taints no node satisfies (Module 3). `describe` spells out "0/5 nodes available: …".
- **ImagePullBackOff / ErrImagePull** → wrong image name/tag or missing registry credentials (`imagePullSecrets`).
- **CrashLoopBackOff** → the container keeps **exiting**; read `logs --previous` and the **exit code** (137 = SIGKILL/often OOM; 1 = app error; a missing env/config is common). "BackOff" is just the kubelet waiting longer between restarts.
- **OOMKilled** → exceeded the **memory limit** (Module 3.2) — raise the limit or fix the leak.

:::incident
A pod is **`Running` but gets no traffic**, and its Service's endpoints are empty. Not a crash — so `logs` looks clean and the usual crash hunt finds nothing. The cause is the **readiness probe failing** (Module 3.3): the container is up, but readiness never passes, so it's held out of the EndpointSlice (Module 2.3). `kubectl describe pod` shows `Readiness probe failed:` in Events. Common reasons: the probe path returns non-200 while the app warms, the probe port is wrong, or readiness depends on a downstream that's down. Confirm with `kubectl get endpointslices` (is the pod IP listed?) and curl the probe path from inside: `kubectl exec -it POD -- curl localhost:8080/healthz`.
:::
