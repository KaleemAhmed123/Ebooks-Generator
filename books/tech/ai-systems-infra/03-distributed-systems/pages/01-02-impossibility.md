## What you provably cannot do

- Two results bound what's possible, and knowing them stops you chasing guarantees that don't exist.
- **The Two Generals Problem.** Two generals must attack together to win, but can only send messengers across enemy territory, where messages can be lost. Can they ever be *certain* they'll attack at the same time? No. Each confirmation needs its own confirmation — "I'll attack at dawn," "got it," "got your got-it" — an infinite regress. **Over an unreliable channel, guaranteed agreement is impossible.** You can only make it *very likely* (resend, acknowledge, time out) — never certain.
- **FLP (Fischer–Lynch–Paterson).** In a fully **asynchronous** system (no bound on message delay), if even **one** process can crash, there is **no deterministic algorithm that is guaranteed to reach consensus and always terminate.** The catch is the inability to tell a crashed node from a slow one (Module 1): you can wait forever for a message that may never come.

- These sound like reasons to give up; they're the opposite — they tell you **where the knobs are**:
  - Because certainty is impossible, real systems add **timeouts** (assume dead after waiting) and **retries** (resend and hope), accepting a small chance of being wrong.
  - Because pure async consensus can't guarantee termination, practical protocols add a **partial-synchrony assumption** (messages usually arrive within some time) and **randomness**. Raft (Module 6) uses randomized election timeouts for exactly this reason — to break the symmetry FLP says you can't break deterministically.

:::note
The practical reading: **every distributed guarantee is really "guarantee, given these timing assumptions."** When a vendor says "strongly consistent" or "exactly-once," the honest question is *"under what failure and timing assumptions, and what happens when they're violated?"* These two impossibility results are why that question always has an answer involving a trade-off, never a free lunch.
:::
