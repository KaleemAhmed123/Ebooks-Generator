## Commands vs events

| | Command | Event |
|---|---|---|
| Meaning | "do this" | "this happened" |
| Addressed to | one specific service | whoever is listening |
| Can be rejected | yes | no — it is a fact |
| Example | `ChargeCard` | `CardCharged` |

- An orchestrator sends commands and expects a specific reply; choreographed services publish events and expect nothing back. Mixing the two without naming which is which is how a saga step ends up unable to say no to something phrased as already decided
- The naming gives it away before the design does: an imperative name (`ShipOrder`) is a command in disguise if it is published where every event on the topic is supposed to be a past-tense fact. A consumer that cannot refuse it has been handed a command wearing an event's clothes

### The failure

- `ShipOrderPlease` published on the orders event topic, addressed to nobody, and three services all pick it up and ship independently because an event has no single addressee. A command needs one recipient; publish it as one, or route it, not broadcast it
