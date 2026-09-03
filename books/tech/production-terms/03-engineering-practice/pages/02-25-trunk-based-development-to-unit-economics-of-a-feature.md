## Trunk-Based Development

"A source-control branching model, where developers collaborate on code in a
single branch called 'trunk' and resist any pressure to create other long-lived
development branches." At scale it still uses branches — but only for code
review and CI before the commit lands on trunk, never for building or publishing
artefacts. Feature flags and branch by abstraction are what let a large change
arrive in pieces.

<svg viewBox="0 0 460 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Short-lived branches leave the trunk and rejoin it within hours, while a long-lived branch diverges and never returns, deferring every conflict to a single merge">
  <text x="8" y="42" font-family="Consolas,monospace" font-size="8.5" fill="#0d7a7a">trunk</text>
  <path d="M46 38 H448" stroke="#0d7a7a" stroke-width="1.6"/>
  <circle cx="90" cy="38" r="2.6" fill="#1a1a1a"/>
  <circle cx="170" cy="38" r="2.6" fill="#1a1a1a"/>
  <circle cx="250" cy="38" r="2.6" fill="#1a1a1a"/>
  <circle cx="330" cy="38" r="2.6" fill="#1a1a1a"/>
  <circle cx="410" cy="38" r="2.6" fill="#1a1a1a"/>
  <path d="M110 38 C124 16, 156 16, 170 38" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M290 38 C304 16, 336 16, 350 38" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <text x="112" y="12" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">short-lived: review and CI, then it is gone</text>
  <path d="M210 38 C260 56, 320 66, 440 70" stroke="#6b6b6b" stroke-width="1.2" fill="none" stroke-dasharray="4 3"/>
  <text x="180" y="84" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">long-lived: one merge, every conflict at once</text>
</svg>

**Deleting the branch does not delete the integration, it moves it into the
flag.** A flag left in place after its rollout is a branch you can no longer see.

## Unit Economics of a Feature

Cost divided by a business denominator — per customer, per transaction, per
document processed — instead of cost in total. The FinOps Foundation separates
resource-efficiency metrics (cost per GB, per vCPU, per token) from business
metrics (cost to serve, cost per case resolved).

Total spend rising tells you nothing alone. Spend rising while cost per
transaction falls is scale working. Spend flat while cost per transaction rises
is a leak.

**The denominator is the hard part, not the numerator.** Splitting a shared
Kafka cluster or a shared model endpoint across features needs an allocation
rule someone can defend, and a unit cost built on an arbitrary split gets argued
about rather than acted on.
