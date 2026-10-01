## Caching tool results

- Agents repeat themselves — the same search, the same lookup, across turns and runs. **Caching** tool results turns a repeated expensive call into a cheap lookup, cutting cost and latency, and is a quick, high-leverage optimization once an agent is working. **[VERIFY]**

<svg viewBox="0 0 360 82" role="img" aria-label="A cache returns a stored result for a repeated tool call, skipping the expensive execution" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="30" width="70" height="22" rx="3" fill="#24405e"/><text x="45" y="44" text-anchor="middle" fill="#fff" font-size="6">tool call</text>
  <rect x="108" y="26" width="80" height="30" rx="4" fill="#a03050"/><text x="148" y="40" text-anchor="middle" fill="#fff" font-size="6">cache?</text><text x="148" y="50" text-anchor="middle" fill="#fc8" font-size="5.5">key = name+args</text>
  <rect x="220" y="16" width="130" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="285" y="28" text-anchor="middle" font-size="6">hit → return stored (cheap)</text>
  <rect x="220" y="42" width="130" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="285" y="54" text-anchor="middle" font-size="6">miss → run, store result</text>
  <path d="M80 41 L106 41" stroke="#888" marker-end="url(#tc)"/><path d="M188 38 L218 27" stroke="#888" marker-end="url(#tc)"/><path d="M188 44 L218 50" stroke="#888" marker-end="url(#tc)"/>
  <defs><marker id="tc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The mechanism:** key the cache by the tool name + its arguments (`get_weather(city=Paris)`). On a call, check the cache; a **hit** returns the stored result without running the tool; a **miss** runs it and stores the result for next time. Within one run (an agent searching the same term twice) and across runs (many users asking about the same thing), this eliminates redundant work.
- **Cache only what is safe to cache — the freshness/side-effect rules:**
  - **Read-only, stable data** → cache freely (a doc lookup, a stable reference).
  - **Time-sensitive data** → cache with a short **TTL** (time-to-live) so it does not go stale (a stock price cached for seconds, not hours).
  - **Side-effecting actions** → **never cache** (do not "cache" sending an email — that is the idempotency concern, 15-18, not caching). Only cache tools that *read*, not ones that *act*.
- **The payoff and the trap:** caching can dramatically cut an agent's cost and latency (repeated calls are common). The trap is a *stale cache* serving old data as if fresh (the stale-fact problem, 14-33) — so match the TTL to how fast the data changes, and never cache what must be current or what acts.

:::interview
"How and when do you cache an agent's tool calls?"

Key a cache by tool name plus arguments; a hit returns the stored result cheaply, a miss runs the tool and stores it — eliminating redundant searches and lookups within and across runs, which cuts cost and latency substantially. The rules: cache read-only stable data freely, cache time-sensitive data with a short TTL matched to how fast it changes, and *never* cache side-effecting actions (caching an email-send is meaningless — that's idempotency, a different concern). The main risk is a stale cache serving old data as current, so tune TTLs to freshness needs and only cache tools that read, never ones that act.
:::
