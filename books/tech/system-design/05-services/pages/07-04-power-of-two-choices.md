## The power of two choices

- Exact least-loaded has two problems at scale: scanning every instance costs `O(N)` per request, and every balancer scans the same slightly stale numbers and reaches the same answer at the same moment

<svg viewBox="0 0 460 124" role="img" aria-label="Two ways to pick a backend. On the left, global least-loaded from stale load data: three balancers all see node three reporting zero load and all send to it at the same moment, so it immediately becomes the most loaded. On the right, the power of two choices: one balancer samples two instances at random, sees loads of nine and eleven, and sends to the one with nine. Envoy's least-request policy works exactly this way, with choice_count defaulting to two, sampling rather than scanning the fleet." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="113" y="12" text-anchor="middle" font-size="7.5" fill="#bf4c28">global least-loaded, stale data</text>
  <rect x="20" y="22" width="40" height="14" rx="2" fill="#fff" stroke="#1d4e89"/><text x="40" y="32" text-anchor="middle" font-size="6.5">lb 1</text>
  <rect x="94" y="22" width="40" height="14" rx="2" fill="#fff" stroke="#1d4e89"/><text x="114" y="32" text-anchor="middle" font-size="6.5">lb 2</text>
  <rect x="168" y="22" width="40" height="14" rx="2" fill="#fff" stroke="#1d4e89"/><text x="188" y="32" text-anchor="middle" font-size="6.5">lb 3</text>
  <line x1="40" y1="36" x2="104" y2="46" stroke="#bf4c28" marker-end="url(#e)"/>
  <line x1="114" y1="36" x2="111" y2="46" stroke="#bf4c28" marker-end="url(#e)"/>
  <line x1="188" y1="36" x2="118" y2="46" stroke="#bf4c28" marker-end="url(#e)"/>
  <rect x="8" y="48" width="36" height="20" rx="2" fill="#fff" stroke="#999"/><text x="26" y="62" text-anchor="middle" font-size="7">12</text>
  <rect x="50" y="48" width="36" height="20" rx="2" fill="#fff" stroke="#999"/><text x="68" y="62" text-anchor="middle" font-size="7">9</text>
  <rect x="92" y="48" width="36" height="20" rx="2" fill="#fbe9e2" stroke="#bf4c28"/><text x="110" y="62" text-anchor="middle" font-size="7">0</text>
  <rect x="134" y="48" width="36" height="20" rx="2" fill="#fff" stroke="#999"/><text x="152" y="62" text-anchor="middle" font-size="7">14</text>
  <rect x="176" y="48" width="36" height="20" rx="2" fill="#fff" stroke="#999"/><text x="194" y="62" text-anchor="middle" font-size="7">11</text>
  <text x="113" y="82" text-anchor="middle" font-size="6.5" fill="#bf4c28">all three pick the idle node at once</text>
  <text x="113" y="92" text-anchor="middle" font-size="6.5">a moment later it is the busiest</text>
  <text x="347" y="12" text-anchor="middle" font-size="7.5" fill="#1d4e89">power of two choices</text>
  <rect x="326" y="22" width="40" height="14" rx="2" fill="#fff" stroke="#1d4e89"/><text x="346" y="32" text-anchor="middle" font-size="6.5">lb</text>
  <line x1="338" y1="36" x2="304" y2="46" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="354" y1="36" x2="426" y2="46" stroke="#999" stroke-dasharray="2 2"/>
  <rect x="242" y="48" width="36" height="20" rx="2" fill="#fff" stroke="#999"/><text x="260" y="62" text-anchor="middle" font-size="7">12</text>
  <rect x="284" y="48" width="36" height="20" rx="2" fill="#e6f2ff" stroke="#1d4e89" stroke-width="1.4"/><text x="302" y="62" text-anchor="middle" font-size="7">9</text>
  <rect x="326" y="48" width="36" height="20" rx="2" fill="#fff" stroke="#999"/><text x="344" y="62" text-anchor="middle" font-size="7">0</text>
  <rect x="368" y="48" width="36" height="20" rx="2" fill="#fff" stroke="#999"/><text x="386" y="62" text-anchor="middle" font-size="7">14</text>
  <rect x="410" y="48" width="36" height="20" rx="2" fill="#fff" stroke="#1d4e89" stroke-width="1.4"/><text x="428" y="62" text-anchor="middle" font-size="7">11</text>
  <text x="347" y="82" text-anchor="middle" font-size="6.5">sample two at random: 9 and 11</text>
  <text x="347" y="92" text-anchor="middle" font-size="6.5" fill="#1d4e89">send to 9 — no herd is possible</text>
  <text x="4" y="108" font-size="7">Envoy's least-request policy is exactly this, with choice_count defaulting to 2 — sampling two, never scanning the fleet</text>
  <text x="4" y="120" font-size="7.5" fill="#bf4c28">✕ least-loaded on stale numbers: every balancer sees the same idle node and fills it before the next update lands</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker><marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker></defs>
</svg>

- Sampling two and taking the lighter is `O(1)` and removes the herd by construction: two balancers rarely draw the same pair, so no instance can attract everyone
- It lands close to exact least-loaded because a request only reaches the worst instance when *both* draws are bad, so the chance of hitting an overloaded node falls roughly as the square of its share. Envoy calls this "resistance to herding behavior"

:::interview
"How does a load balancer choose which instance gets the request?" — Round robin if requests cost the same, weighted if the instances differ. Least-request if durations vary, because a slow instance accumulates in-flight requests and is handed fewer without anyone tuning it. At scale that is not a scan: it samples two at random and takes the lighter, which is `O(1)` and removes herding, since exact least-loaded has every balancer read the same stale numbers and flood the same idle node. Hashing is the separate case — the goal is not balance but sending a key to the same instance every time, and then it must be consistent.
:::

### The failure

- Exact least-loaded across independent balancers. An instance finishes a batch and reports zero, every balancer routes to it before the next load report lands, and it goes from idle to overloaded in one interval — then reports high load and is starved, oscillating instead of settling
