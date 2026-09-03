## Semantic Router

Classifying an incoming request by intent and dispatching it to the right model,
prompt or tool — usually with a tiny classifier rather than a large model.

A cheap embedding classifier routes 70% of traffic to a small model and
escalates only genuinely complex requests. Cost fell sharply with no measurable
quality loss.

### How it works

If every request goes to your most capable model, you pay premium rates for work
a much cheaper one handles perfectly. Routing classifies first and sends the
request where it belongs.

**The classifier has to be cheap or it consumes the saving.** A large model
deciding which model to use is self-defeating, and it is a surprisingly common
first implementation.

What works: a small embedding model comparing the query against example intents,
a lightweight trained classifier, or in simple cases a heuristic on length and
request type.

| Tier | Handles |
|---|---|
| Cache hit | free |
| Small model | classification, short extraction |
| Mid model | standard requests |
| Largest model | genuinely complex analysis |

An escalation path improves it further: try the cheap model, promote when
confidence is low or validation fails.

### In practice

**The risk is a quality regression concentrated in whatever gets routed
cheaply**, invisible in aggregate metrics because most traffic is unaffected.

Evaluate per route rather than overall, and check specifically that the
small-model path meets the bar on the cases actually being sent to it — not on
the evaluation set as a whole, which contains plenty of cases it never sees.
