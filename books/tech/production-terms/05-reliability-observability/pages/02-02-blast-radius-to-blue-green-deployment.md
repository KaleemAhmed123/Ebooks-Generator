## Blast Radius

How much of the system one failure can take with it. Every architecture decision
moves this number, usually without anyone naming it out loud.

| Topology | Blast radius |
|---|---|
| one shared database for all tenants | 100% of users |
| shard per region | one region |
| cell architecture | one cell |
| canary at 5% | 5% of traffic |

The number only holds if the isolation is real. Regional shards that share one
global control plane have a blast radius of everything, and you learn that on
the day the control plane fails.

## Blue-Green Deployment

Two identical production environments. The new version goes to the idle one, is
verified there, then the load balancer sends all traffic across. Rollback is the
same flip in reverse.

<svg viewBox="0 0 460 98" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A load balancer sends live traffic to the blue environment and can flip it to the tested green environment in one step">
  <rect x="176" y="4" width="108" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="230" y="19" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">load balancer</text>
  <path d="M230 26 V40 M230 40 H110 M110 40 V52" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M110 54 l-4 -7 h8 z" fill="#1a1a1a"/>
  <path d="M230 40 H350 M350 40 V52" stroke="#d0212f" stroke-width="1.2" stroke-dasharray="4 3" fill="none"/>
  <path d="M350 54 l-4 -7 h8 z" fill="#d0212f"/>
  <text x="292" y="36" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#d0212f">the flip</text>
  <rect x="24" y="56" width="172" height="36" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="110" y="72" text-anchor="middle" font-family="Consolas,monospace" font-size="10" fill="#1a1a1a">BLUE — v1</text>
  <text x="110" y="86" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#6b6b6b">serving now</text>
  <rect x="264" y="56" width="172" height="36" fill="#e2fcf3" stroke="#d0212f" stroke-width="1.6"/>
  <text x="350" y="72" text-anchor="middle" font-family="Consolas,monospace" font-size="10" fill="#d0212f">GREEN — v2</text>
  <text x="350" y="86" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">idle, smoke-tested</text>
</svg>

What the flip does not undo is the schema. Green ran its migrations against the
database blue is still using, so a rollback puts old code on a new schema.
