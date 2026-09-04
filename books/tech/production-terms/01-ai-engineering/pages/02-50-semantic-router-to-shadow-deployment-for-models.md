## Semantic Router

Classifying an incoming request by intent, then dispatching it to the model,
prompt or tool that fits — usually by comparing the query embedding against
example intents, or with a small trained classifier.

The classifier has to be cheap or it eats the saving it exists to produce. A
large model deciding which model to use is self-defeating, and it is a common
first implementation. Escalation improves it further: try the cheap path,
promote when confidence is low or validation fails.

| Tier | Handles |
|---|---|
| Cache hit | free |
| Small model | classification, short extraction |
| Largest model | genuinely complex analysis |

**A cheap route regresses quality invisibly.** Most traffic is unaffected, so
the aggregate barely moves. Evaluate per route, and hold the small-model path to
the cases actually sent to it — not the whole evaluation set, most of which it
never sees.

## Shadow Deployment for Models

Mirroring live requests to a candidate model while the current one keeps serving
users. The candidate's output is logged and thrown away; nobody sees it.

What it buys over offline evaluation is comparison on identical real inputs,
including the ones a fixed dataset does not contain because nobody thought to
write them down.

<svg viewBox="0 0 460 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An incoming request is served by the live model and returned to the user, while a copy is sent to the candidate model whose output is logged and discarded">
  <rect x="4" y="26" width="76" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="42" y="44" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">request</text>
  <path d="M80 40 H112" stroke="#1a1a1a" stroke-width="1.2"/><path d="M112 40 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="114" y="4" width="104" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="166" y="22" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">live model</text>
  <path d="M100 40 V18 H112" stroke="#1a1a1a" stroke-width="1.2"/><path d="M112 18 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M218 18 H300" stroke="#1a1a1a" stroke-width="1.2"/><path d="M300 18 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="304" y="21" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">user</text>
  <path d="M100 40 V62 H112" stroke="#1a1a1a" stroke-width="1.2" stroke-dasharray="3 3"/><path d="M112 62 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="114" y="48" width="104" height="28" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="166" y="66" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">candidate</text>
  <path d="M218 62 H300" stroke="#1a1a1a" stroke-width="1.2" stroke-dasharray="3 3"/><path d="M300 62 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="304" y="65" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">log, discard</text>
</svg>

The precondition is side effects: if the candidate path can call tools that
send, write or charge, mirroring the traffic mirrors the actions. Stub every
external effect first.

**Review the disagreements, not the aggregate.** Where the two models match,
you learn nothing. Reading fifty differing cases settles it faster than any
summary statistic.
