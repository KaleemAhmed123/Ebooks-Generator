# Module 5 - Contracts, change, and deploy safety

## The contract is the API plus its behaviour

- A **contract** is everything one service may rely on when it calls another. Half of it is written down: an OpenAPI document or a protobuf `.proto` declaring that `amount` is an integer and `currency` a three-letter string
- The other half is the semantics — what the value means, when the field is present, what a second identical call does. No validator checks that half, and it is the half that breaks callers

| The schema says | The contract also says, silently |
|---|---|
| `amount: integer` | minor units, tax excluded, never negative |
| `status: string` | one of four values; `PENDING` means unshipped, not unpaid |
| `POST /refunds` → `201` | a repeat with the same key returns the first refund (booklet 01) |
| `items: array` | at most 100, ordered by line number |

- Every row on the right began as something one team knew and the other guessed. The work is moving them left: a comment in the `.proto`, a worked example beside the endpoint, a consumer test that fails when the meaning moves (page 4)
- Schema tooling earns its place here, because it makes one question mechanical — is this change safe (page 2) — and leaves the team only the questions that need judgement

### The failure

- The change that passes every check and breaks production. `status: "PENDING"` is reinterpreted from "waiting for shipment" to "waiting for payment". Same field, same type, same value, new meaning
- The compiler passes, the schema validator passes, the contract tests pass, and three downstream services now read a fulfilment state as a payment state. Nothing in the pipeline can catch it, because nothing in the pipeline knows what the word meant yesterday. A meaning change is a breaking change with no signature to detect it, so it has to be announced by a person
