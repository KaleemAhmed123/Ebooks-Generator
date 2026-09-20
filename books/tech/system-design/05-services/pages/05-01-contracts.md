## The contract is the API plus its behaviour

- When Service A calls Service B, they communicate through a contract. The visible part of the contract is the schema: an OpenAPI specification or a Protocol Buffers (`.proto`) definition. It dictates that `amount` is an integer and `currency` is a string
- The invisible part of the contract is the semantics—the behaviour that the schema cannot encode. If Service B changes its internal logic so that `amount` now includes sales tax instead of excluding it, the schema has not changed, but the contract is broken

### The failure

- The failure is assuming that if the schema validates, the change is safe to deploy. A team changes the meaning of a `status: "PENDING"` field to mean "waiting for payment" instead of "waiting for shipment"
- The type is still a string, and the value is still `"PENDING"`. The compiler passes, the OpenAPI validator passes, but every downstream service that reads that status breaks. Contracts are behavioral agreements, not just types
