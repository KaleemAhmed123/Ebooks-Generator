## The OOM killer — why pods die

- Because Linux **overcommits**, it can promise more memory than exists and usually get away with it (most promised pages are never touched). When promises come due and a page genuinely needs backing but RAM and swap are exhausted, the kernel has no polite option left: it runs the **OOM killer**, picks a victim, and sends it `SIGKILL`.
- The victim is chosen by **`oom_score`** — a badness score dominated by how much memory the process uses, tunable per process via `oom_score_adj`. The biggest hog usually dies, which is often, but not always, the culprit.

<svg viewBox="0 0 360 120" role="img" aria-label="Allocation flow: on memory pressure the kernel reclaims page cache first; if that is not enough it invokes the OOM killer, scoped to the whole node or to a single container cgroup" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="8" y="46" width="70" height="26" rx="3" fill="#eef0f5" stroke="#3a3f58"/><text x="43" y="60" text-anchor="middle" font-size="6.3">page needs</text><text x="43" y="69" text-anchor="middle" font-size="6.3">a frame</text>
  <rect x="104" y="46" width="78" height="26" rx="3" fill="#f7f8fb" stroke="#3a3f58"/><text x="143" y="60" text-anchor="middle" font-size="6.3">reclaim page</text><text x="143" y="69" text-anchor="middle" font-size="6.3">cache first</text>
  <rect x="208" y="20" width="140" height="24" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="278" y="35" text-anchor="middle" font-size="6.3">enough? → map it, done</text>
  <rect x="208" y="74" width="140" height="34" rx="3" fill="#fdf2f2" stroke="#c0392b"/><text x="278" y="88" text-anchor="middle" font-size="6.3">still short → OOM kill</text><text x="278" y="99" text-anchor="middle" font-size="5.5" fill="#777">node-wide, or one cgroup (container)</text>
  <path d="M78 59 L104 59" stroke="#1a1a1a" marker-end="url(#o1)"/>
  <path d="M182 54 L208 36" stroke="#1a1a1a" marker-end="url(#o1)"/>
  <path d="M182 64 L208 86" stroke="#1a1a1a" marker-end="url(#o1)"/>
  <defs><marker id="o1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **In containers this is sharper.** Each container runs in a **cgroup v2** with a `memory.max`. Exceed it and you hit a **cgroup (memcg) OOM**: the kernel kills a process *inside that one cgroup*, leaving the rest of the node untouched. In Kubernetes that is a container passing its **memory limit** → the pod shows **OOMKilled**, exit code **137** (128 + signal 9).
- Only **RSS-style anonymous memory** forces the kill; cached file pages in the cgroup are reclaimed first. Two very different bugs land here: a genuine **memory leak** (RSS climbs forever) and a **limit set too low** for honest working-set. You cannot tell them apart from the word "OOMKilled" — you need the RSS trend.

:::incident
A pod restarts every few hours with exit 137. Is it a leak or a too-low limit? Plot container RSS over time (`kubectl top` / cAdvisor): a straight climb to the limit then death = **leak**; a sawtooth that spikes to the limit under load bursts then recovers elsewhere = **limit too low** for peak working-set. The fix differs — patch the leak, or raise the limit/request. Requests vs limits come in Booklet 6.
:::
