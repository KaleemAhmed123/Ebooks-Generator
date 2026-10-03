## Idempotency and side effects

- The hard part of durable execution is **side effects**. Reloading state is easy; ensuring a tool that already *acted on the world* does not act *again* on resume is not. The tool for this is **idempotency** — designing actions so that doing them twice is the same as doing them once.

<svg viewBox="0 0 360 90" role="img" aria-label="A resume replays a step; an idempotency key ensures the side effect happens only once" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="34" width="70" height="24" rx="3" fill="#24405e"/><text x="45" y="43" text-anchor="middle" fill="#fff" font-size="6">resume →</text><text x="45" y="52" text-anchor="middle" fill="#cdd" font-size="5">replay step</text>
  <rect x="108" y="30" width="90" height="32" rx="4" fill="#a03050"/><text x="153" y="44" text-anchor="middle" fill="#fff" font-size="6">check idempotency</text><text x="153" y="54" text-anchor="middle" fill="#fc8" font-size="5">key: "order-77"</text>
  <rect x="228" y="20" width="120" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="288" y="32" text-anchor="middle" font-size="6">already done → skip ✓</text>
  <rect x="228" y="44" width="120" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="288" y="56" text-anchor="middle" font-size="6">not done → do it once</text>
  <path d="M80 46 L106 46" stroke="#888" marker-end="url(#id2)"/><path d="M198 42 L226 30" stroke="#888" marker-end="url(#id2)"/><path d="M198 50 L226 52" stroke="#888" marker-end="url(#id2)"/>
  <defs><marker id="id2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The failure it prevents:** an agent charges a card, then crashes before recording that it did. On resume it replays the step and charges *again*. Idempotency stops the double-charge.
- **The mechanism — idempotency keys:** attach a unique key to each side-effecting action (e.g. `charge:order-77`). Before executing, check whether that key already succeeded; if so, skip and reuse the prior result. Many APIs (payment processors especially) support an idempotency key natively for exactly this reason.
- **Make effects idempotent where you can, gate them where you can't.** Prefer operations that are naturally safe to repeat (setting a value vs incrementing it; "ensure exists" vs "create"). For genuinely non-idempotent, non-reversible actions (sending a physical package), record completion *before* considering the step done, and use a human gate (15-14) so a resume cannot silently re-fire it.
- **This connects to hallucinated/over-action** (14-127): the same discipline — every consequential action is tracked, verified, and not blindly repeated — protects against both a crashed resume *and* a confused agent re-doing things.

:::interview
"An agent crashes after sending an email but before saving that it did — how do you prevent it re-sending on resume?"

Idempotency. Give each side-effecting action a unique idempotency key (e.g. `email:ticket-123`), and before executing, check whether that key already completed — if so, skip and reuse the result. Design actions to be naturally repeatable where possible ("ensure sent" semantics, provider-level idempotency keys), and for truly non-idempotent actions, record completion durably before marking the step done and gate them behind human approval. The rule: a durable resume must never re-fire a side effect that already happened.
:::
