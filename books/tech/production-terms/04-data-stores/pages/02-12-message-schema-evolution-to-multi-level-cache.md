## Message Schema Evolution

Producers and consumers deploy independently, so a format change has to be
backward compatible or it breaks consumers that are still running the old code.

Renaming a field breaks every consumer that has not deployed yet — which, during
a rollout, is all of them.

| Safe | Breaks a live consumer |
|---|---|
| add an optional field | rename a field |
| widen a type | remove a field still being read |
| add an enum value old code ignores | change what a field means |

The last entry on the right is the dangerous one — it passes every schema check.
The migration path is always: add, dual-write, migrate consumers, remove.

## Multi-Level Cache

*L1 / L2*

A small in-process cache in front of Redis. L1 removes the network hop entirely
for the hottest keys; the price is staleness that differs per instance.

Feature flags cached five seconds in-process and sixty seconds in Redis. Redis
traffic drops by 95%, and a flag flip takes up to five seconds to reach every
pod.

<svg viewBox="0 0 460 58" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A request checks an in-process L1 cache, then Redis as L2, then the database, with the L1 hit costing no network time">
  <text x="4" y="26" font-family="Consolas,monospace" font-size="9" fill="#1a1a1a">request</text>
  <path d="M56 22 H80" stroke="#1a1a1a" stroke-width="1.2"/><path d="M80 22 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="84" y="12" width="112" height="20" fill="#e2fcf3" stroke="#2a5673" stroke-width="1.3"/>
  <text x="140" y="26" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#2a5673">L1 in-process, 5s</text>
  <path d="M198 22 H222" stroke="#1a1a1a" stroke-width="1.2"/><path d="M222 22 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="226" y="12" width="96" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="274" y="26" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">L2 Redis, 60s</text>
  <path d="M324 22 H348" stroke="#1a1a1a" stroke-width="1.2"/><path d="M348 22 l-6 -3.5 v7 z" fill="#1a1a1a"/>
  <rect x="352" y="12" width="60" height="20" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="382" y="26" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">DB</text>
  <text x="84" y="50" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">an L1 hit costs no network at all — and each pod can hold a different answer</text>
</svg>

Different pods holding different values is the trade, not a bug. It only becomes
a bug when someone flips a flag and watches two browser tabs disagree.
