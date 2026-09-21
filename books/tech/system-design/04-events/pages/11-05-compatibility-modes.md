## Compatibility modes

| Mode | Upgraded first | Allows |
|---|---|---|
| `BACKWARD` (default) | consumers | remove a field, add an optional field |
| `FORWARD` | producers | add a field, remove an optional field |
| `FULL` | either | only changes safe both ways |
| transitive variants | — | checked against every version in the wild, not just the last one |

- `BACKWARD` means new-schema data must be readable by code written against the old schema — consumers upgrade first. `FORWARD` is the mirror: producers upgrade first, old consumers must tolerate new-shape data
- A required new field breaks `BACKWARD` compatibility even though it looks additive: old consumer code has no way to fill in a field it does not know is required. `BACKWARD` only tolerates a new field when it is optional, with a default a reader can fall back to

:::interview
"How do you change an event's schema without breaking consumers?" — Pick a compatibility mode before the first schema exists, not after the first break. `BACKWARD` (the default) means new producer output must stay readable by code written against the old schema: additive optional fields only, nothing required, nothing removed that a reader depends on. The registry checks this at register time, so a breaking change is rejected before it ships, not discovered by a consumer crashing in production.
:::

### The failure

- Adding a required field under `BACKWARD` compatibility because "it's just one more field." Every consumer still running the prior schema version has no value to put there, and depending on the reader, the message either errors or silently gets a default nobody chose
