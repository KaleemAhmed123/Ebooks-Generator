## Versioning strategies

- Four ways to carry a breaking change once additive-only stops being enough: keep evolving additively forever (works until a field truly must change type or meaning), a `v2` type name on the same topic (`order.placed.v2`), a new topic entirely, or **upcasting** — a translation layer that reads old-shape events and hands consumers the new shape, so only one version ever reaches application code

| Strategy | Consumers see | Cost |
|---|---|---|
| Additive only | one shape, always | eventually runs out |
| `v2` type name | both shapes, must handle each | branching logic in every consumer |
| New topic | one shape per topic | producers and consumers both migrate |
| Upcasting | always the newest shape | one place to maintain the translation |

- A breaking change is hardest exactly where retention is longest and replay is most likely (Module 7): a topic with a week of history and a consumer that replays from zero will read old-shape and new-shape events in the same run, whichever strategy is chosen. Upcasting is the one strategy that makes that automatic — the translation runs once, at read time, regardless of how far back the replay goes
- Additive-only is the default worth trying first for exactly the reason `BACKWARD` compatibility rewards it (page 5): most schema changes are genuinely additive if the new field is optional with a sensible default

### The failure

- A breaking change shipped straight onto a topic with seven days of retention and a consumer that replays from offset zero after an incident. The replay hits old-shape events with no version marker at all, since nobody planned for two shapes to coexist, and the consumer cannot tell which parser to use
