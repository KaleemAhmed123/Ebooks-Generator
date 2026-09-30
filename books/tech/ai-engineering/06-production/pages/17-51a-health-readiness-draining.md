## Health, readiness, and draining

- A GPU pod has a lifecycle the load balancer must respect, or you drop requests on every deploy and scale event. The three hooks that manage it: **liveness**, **readiness**, and **graceful drain**.

| Probe | Answers | If it fails |
|---|---|---|
| **liveness** | is the process alive? | restart the pod |
| **readiness** | can it serve *now*? | stop routing to it (don't restart) |
| **drain** | (on shutdown) finish in-flight, refuse new | remove cleanly |

- **Readiness is the one people get wrong for GPUs.** A pod is *live* the moment the process starts, but it is not *ready* until the model is loaded into VRAM and warmed (40–120 s, page 17-34). Route traffic to a live-but-not-ready pod and every request fails until the model finishes loading. Readiness must gate on *model loaded + a successful test generation*, not just "port open."
- **Graceful drain protects in-flight generations.** On a deploy or scale-down, the pod must be pulled from the load balancer, *finish the requests it is already streaming*, then exit — never killed mid-generation. For streaming responses that can mean waiting seconds; the shutdown grace period must exceed your longest expected generation, or users see truncated answers on every rollout.

:::warn
The classic GPU-serving outage is a rolling deploy with a too-short grace period: Kubernetes sends SIGTERM, the pod is killed before its in-flight streams finish, and every user mid-conversation during the deploy gets a cut-off response. It passes every test (tests don't stream for 30 seconds) and fails silently in production on every single deploy. Set the termination grace period above your P99 generation time, and make the pod refuse new work but drain old work on SIGTERM.
:::
