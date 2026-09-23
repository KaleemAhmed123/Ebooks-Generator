## Compatible and breaking, precisely

- Inside one process a signature and its callers change in the same commit. Across services they deploy hours or weeks apart, in an order nobody controls, and during a rolling deploy both versions serve at once
- So a change needs two properties. **Backward compatible**: an old caller still works against the new service. **Forward compatible**: a new caller still works against the old one. A rolling deploy (page 8) needs both for the minutes the fleet is mixed

| Change | Safe | Why |
|---|---|---|
| Add an optional field | yes | old callers omit it; the service defaults it |
| Add a required field | no | old callers omit it and fail validation |
| Remove or rename a field | no | a rename is a remove and an add at once |
| Change a type | no | `int` → `string` breaks parsing; `int` → `float` breaks strict readers |
| Add an enum value | no | old callers fall to a `default:` branch that usually throws |
| Loosen a constraint | no | `maxLength` 50 → 200 breaks the caller's column, not its parser |

- The last two are the ones teams get wrong, because both look additive. Widening what a service may *return* is a breaking change; widening what it will *accept* is not
- The other half is the reader. A **tolerant reader** ignores fields it does not recognise rather than rejecting the message. Protobuf does this by construction; JSON depends entirely on the parser's settings. Encoding formats and their compatibility rules are booklet 02

### The failure

- A strict deserializer downstream. The user service adds an optional `date_of_birth` to its response — textbook compatible. The orders service parses with unknown-field rejection turned on, which its framework defaulted to, and starts throwing on every response
- The service that made the safe change is not the service that pages. Tolerance has to exist on the reading side before the writing side can use the rule, which is why "ignore unknown fields" belongs in the shared client, not in each team's good intentions
