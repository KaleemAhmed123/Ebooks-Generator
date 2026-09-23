## Glossary: C–D

| Term | Means | Where |
|---|---|---|
| **CQRS** | separating the model that accepts writes from the models that are read | 4 · 9-05 |
| **CRDT** | a data type whose merge never conflicts: replicas that received the same updates reach the same state | 2 · 6-05 |
| **cursor pagination** | returning an opaque token encoding the last item seen, so the next page starts after it even if rows were inserted above | 6 · 1-05 |
| **DAG** | a directed acyclic graph of tasks, where each task's inputs are earlier tasks' outputs | 6 · 9-03 |
| **dark read** | serving from the old store while also reading the new one and logging every difference | 2 · 8-18 |
| **data plane** | the traffic itself, replicated by ordinary means and fenced by a number the **control plane** issues | 3 · 7-11 |
| **DAU** | daily active users. The number most capacity estimates start from | 1 · 5-01 |
| **dead-letter queue** | where a message goes after its last attempt: a normal queue, read by people and tools rather than by the handler | 4 · 6-03 |
| **deadline** | an absolute point in time by which a call must finish, passed down the chain — unlike a timeout, which is a duration each hop restarts | 1 · 8-05 |
| **deadlock** | two transactions each holding what the other waits for. Databases detect it and abort one | 3 · 3-03 |
| **denormalization** | duplicating data on purpose so one read is cheap | 2 · 1-08 |
| **dirty read** | reading a value another transaction has written and not committed | 3 · 2-01 |
| **dirty write** | overwriting a value another transaction has written and not committed | 3 · 2-01 |
