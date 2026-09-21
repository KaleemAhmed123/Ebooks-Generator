## Naming and granularity

| Bad | Better | Why |
|---|---|---|
| `OrdersRowUpdated` | `OrderPlaced`, `OrderCancelled` | a table diff, not a business fact |
| `EntityChanged` + `changes` blob | one event type per fact | every consumer parses `changes` differently |
| `UserUpdated` | `EmailChanged`, `PlanUpgraded` | one event, many unrelated meanings |

- Name events as **past-tense facts about one aggregate**, not as a mirror of a database write. `OrderPlaced` says what happened in the business's own words; `OrdersRowUpdated` says a table changed and leaves the "what" for the consumer to work out from a diff
- A single generic `EntityChanged` with a `changes` field pushes the parsing problem onto every consumer independently, and each one ends up with its own slightly different idea of what fields mean what — the naming problem does not go away, it multiplies by the number of consumers

### The failure

- One `UserUpdated` event that fires for an email change, a plan upgrade, and a password reset alike, distinguished only by which fields happen to be non-null in the payload. A billing consumer subscribed for plan upgrades processes every password reset too, and has to reverse-engineer which change actually happened
