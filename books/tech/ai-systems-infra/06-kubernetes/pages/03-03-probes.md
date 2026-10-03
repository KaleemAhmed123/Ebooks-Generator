## Liveness, readiness, startup probes

- The kubelet checks a container's health with **probes** — an HTTP call, a TCP connect, or a command exit code, run on a schedule. Three kinds exist, and confusing them causes real outages because they have **opposite failure actions**.
- **Readiness** — "can this pod take traffic *right now*?" On failure, the pod is **removed from its Service's EndpointSlice** (Module 2.3) — traffic stops, but the pod is **not** restarted. It recovers by passing again. This is the correct probe for "my downstream is briefly unavailable" or "I'm warming a cache."
- **Liveness** — "is this container wedged and unrecoverable?" On failure, the kubelet **restarts the container**. Use it only for true deadlocks — a state a restart actually fixes.
- **Startup** — "has a slow-starting app finished booting?" While it runs, liveness and readiness are **suspended**, so a JVM or model-loading container that takes 90s isn't killed by an impatient liveness probe before it's up.

<svg viewBox="0 0 360 80" role="img" aria-label="Readiness failing removes the pod from the service endpoints; liveness failing restarts the container; startup gates both until the app has booted" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="12" width="104" height="26" rx="3" fill="#eaf1fb" stroke="#2a5db0"/><text x="60" y="24" text-anchor="middle" font-size="6.2">readiness fails</text><text x="60" y="34" text-anchor="middle" font-size="5.4" fill="#777">→ off endpoints</text>
  <rect x="128" y="12" width="104" height="26" rx="3" fill="#fdecea" stroke="#c0392b"/><text x="180" y="24" text-anchor="middle" font-size="6.2">liveness fails</text><text x="180" y="34" text-anchor="middle" font-size="5.4" fill="#777">→ restart container</text>
  <rect x="248" y="12" width="104" height="26" rx="3" fill="#f3f7fc" stroke="#2a5db0"/><text x="300" y="24" text-anchor="middle" font-size="6.2">startup running</text><text x="300" y="34" text-anchor="middle" font-size="5.4" fill="#777">→ gates both</text>
  <text x="180" y="58" text-anchor="middle" font-size="6" fill="#777">traffic control vs life-or-death vs boot grace — never wire them the same</text>
  <text x="180" y="72" text-anchor="middle" font-size="5.6" fill="#777">readiness = remove · liveness = restart · startup = wait</text>
</svg>

:::warn
The outage pattern: a **liveness probe that calls a shared dependency** (the database). The DB hiccups, every pod's liveness fails at once, the kubelet restarts the *entire fleet* simultaneously — turning a brief dependency blip into a full outage and a thundering-herd reconnect (Booklet 3). Rule: **liveness checks only the process itself** (is the event loop alive?); **readiness** checks dependencies. Also set `initialDelaySeconds`/`failureThreshold` generously, or use a **startup probe**, so slow boots aren't mistaken for deadlocks.
:::
