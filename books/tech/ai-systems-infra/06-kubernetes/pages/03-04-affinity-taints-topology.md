## Affinity, taints, and topology spread

- By default the scheduler places a pod on any node that fits its **requests** (Module 3.2). Four mechanisms let you constrain *where* — attract pods, repel pods, group pods, or spread pods — and together they're how you pin GPU jobs, isolate tenants, and survive a zone loss.
- **nodeSelector / node affinity — attract.** The pod says "I want nodes labelled `disktype=ssd`" (or `nvidia.com/gpu=true`). Hard (`required…`) means won't schedule otherwise; soft (`preferred…`) means try, but place anyway. This is how AI workloads target GPU nodes (Booklet 9).
- **Taints + tolerations — repel.** A *node* carries a **taint** (`gpu=true:NoSchedule`) that repels all pods **except** those with a matching **toleration**. The logic is inverted from affinity: the node rejects by default. GPU nodes are tainted so that only GPU pods — which tolerate the taint — land on your expensive hardware, keeping ordinary pods off it.
- **Pod affinity / anti-affinity — group.** Place pods *near* each other (affinity: cache next to app for latency) or *apart* (anti-affinity: never two replicas on one node, so one node's death can't take the whole service).

<svg viewBox="0 0 360 76" role="img" aria-label="Node affinity attracts pods to labelled nodes; a taint repels all but tolerating pods; pod anti-affinity and topology spread keep replicas across nodes and zones" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="12" width="82" height="52" rx="4" fill="#eaf1fb" stroke="#2a5db0"/><text x="49" y="26" text-anchor="middle" font-size="6">affinity</text><text x="49" y="40" text-anchor="middle" font-size="5.4" fill="#777">pod → labelled</text><text x="49" y="52" text-anchor="middle" font-size="5.4" fill="#777">node (attract)</text>
  <rect x="98" y="12" width="82" height="52" rx="4" fill="#fdecea" stroke="#c0392b"/><text x="139" y="26" text-anchor="middle" font-size="6">taint</text><text x="139" y="40" text-anchor="middle" font-size="5.4" fill="#777">node repels all</text><text x="139" y="52" text-anchor="middle" font-size="5.4" fill="#777">but tolerators</text>
  <rect x="188" y="12" width="82" height="52" rx="4" fill="#f3f7fc" stroke="#2a5db0"/><text x="229" y="26" text-anchor="middle" font-size="6">anti-affinity</text><text x="229" y="40" text-anchor="middle" font-size="5.4" fill="#777">replicas on</text><text x="229" y="52" text-anchor="middle" font-size="5.4" fill="#777">diff nodes</text>
  <rect x="278" y="12" width="74" height="52" rx="4" fill="#e7efe9" stroke="#2f7d4f"/><text x="315" y="26" text-anchor="middle" font-size="6">topology</text><text x="315" y="40" text-anchor="middle" font-size="5.4" fill="#777">even across</text><text x="315" y="52" text-anchor="middle" font-size="5.4" fill="#777">zones</text>
</svg>

- **topologySpreadConstraints — spread evenly.** Keep pods balanced across a **topology domain** — zones, nodes — so no single zone holds too many replicas. `maxSkew` caps how uneven the distribution may get. This is what makes a service survive an **AZ failure** (Booklet 5): spread replicas across 3 zones and losing one costs a third of capacity, not everything.

:::note
These compose. A production GPU-inference pool typically **taints** GPU nodes (keep cheap pods off), uses **node affinity** so inference pods target the GPU type they need, adds **pod anti-affinity** so replicas don't share a node, and a **topology spread** across zones for AZ resilience — four rules that together turn "run it somewhere" into "run it exactly where it must." Over-constrain, though, and pods go `Pending` with "no nodes available" (Module 6's debugging).
:::
