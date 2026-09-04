## Model Routing

Sending each request to the cheapest model that can handle it instead of sending
everything to the largest. Classification and short extraction go to a small
model; a fifty-page contract goes to the large one.

The router itself has to be cheap, or it eats the saving: a length heuristic, a
keyword rule, or a small embedding classifier. Not another large-model call,
which is a common way to build a router that costs more than it saves.

<svg viewBox="0 0 460 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A request passes through a cheap router to a small model, and escalates to the large model only when the small model signals low confidence">
  <rect x="4" y="30" width="62" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="14" y="45" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">request</text>
  <path d="M66 42 H94" stroke="#1a1a1a" stroke-width="1.2"/><path d="M96 42 l-7 -4 v8 z" fill="#1a1a1a"/>

  <rect x="98" y="30" width="98" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="106" y="45" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">length / keyword</text>

  <path d="M196 42 H220 V22 H248" stroke="#1a1a1a" stroke-width="1.2" fill="none"/><path d="M250 22 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="252" y="10" width="120" height="24" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="262" y="25" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">small model</text>

  <path d="M312 34 V60" stroke="#1a1a1a" stroke-width="1.2" stroke-dasharray="3 2"/><path d="M312 62 l-4 -7 h8 z" fill="#1a1a1a"/>
  <text x="320" y="52" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">low confidence</text>
  <rect x="252" y="62" width="120" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="262" y="77" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">large model</text>

  <text x="4" y="96" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">route optimistically, escalate on failure — the escalation rate is the number to watch</text>
</svg>

**Routing decisions rot silently without a shared evaluation set.** The small
model is worse in ways that surface as a customer complaint months later, by
which time nobody remembers why the rule was set. Re-measure whenever a model
version changes on either side of the split.

## Model Version Pinning

Requesting a dated model identifier rather than a floating alias, so the
provider shipping an update does not silently change your product.

An alias always points at the current version, which hands your product's
behaviour to someone else's release schedule: formatting shifts, edge cases
resolve differently, accuracy moves — with no deploy on your side and nothing in
your changelog. A dated identifier makes the model a dependency you upgrade on
purpose. The cost is that you then have to do the upgrades, because pinned
versions get deprecated.

**Pinning is what makes evaluation mean anything.** If the model can change
underneath you, last month's score describes a system that no longer exists and
you cannot attribute a quality change to your own work. Pin first, then build
the evaluation harness — reversed, the harness spends its first weeks measuring
noise.
