## Before it goes live

- Every item here is covered somewhere in this booklet. Together they are the list worth walking before a feature reaches real users

### Correctness

- An evaluation set of at least twenty real cases, running in CI
- `stop_reason` and `finishReason` handled, including truncation and refusal
- Structured output with a schema anywhere the result feeds code
- A grounded answer path that can say it does not know

### Safety

- Every tool scoped by the session's tenant and user, never by a model argument
- Approval gates on every irreversible action
- Untrusted text marked, and output checked before it is rendered or sent
- No secrets, and no other tenant's data, reachable from any tool

### Cost

- A provider spend limit on the key
- Per-tenant daily budget, enforced in code
- Step, token and wall-clock budgets on every agent
- `usage` logged with tenant, user and feature on every call

### Reliability

- A timeout on every call, and a circuit breaker in front
- One retry layer, not two
- A defined degraded mode for the provider being down
- Long work on a queue, not on a held connection

### Operations

- Prompt id and version logged with every call
- Transcripts stored, redacted, with a retention period
- Alerts on cost change, error rate, and step count
- A feedback control in the interface, wired to the message id

- **If a line here has no owner, it has no implementation.** That is the usual finding on the first walk through this list
