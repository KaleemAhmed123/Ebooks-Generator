## Glossary: C to D

| Term | Means | # |
|---|---|---|
| **cursor pagination** | paging by a stable key rather than an offset, so rows do not shift | 6 |
| **dataloader** | batches and caches per-request lookups to fix the GraphQL **N+1** | 6 |
| **dead letter queue** | where a message goes after failing too many times, so it can be looked at | 5 |
| **deadlock** | two transactions each holding what the other needs. One is killed | 5 |
| **declaration file** | a `.d.ts` describing the types of JavaScript that has none | 1 |
| **denormalization** | copying data to avoid a join, trading write cost for read speed | 5 |
| **deregistration delay** | how long a load balancer lets in-flight requests finish after removing a target | 8 |
| **diagnostics_channel** | Node's built-in publish and subscribe bus for instrumentation | 3 |
| **digest** | the `sha256:` content hash of an image. Unlike a tag, it cannot change | 8 |
| **dimension** | a label on a metric. Also the length of an **embedding** vector | 7, 8 |
| **dirty read** | reading a change another transaction has not committed | 5 |
| **discriminated union** | a union whose members share a literal field, so narrowing is exhaustive | 1 |
| **distillation** | fine-tuning a small model on a large model's outputs to get most of the quality cheaply | 7 |
| **distributed monolith** | services split by technical layer, so they still have to deploy together | 6 |
| **DLQ** | see **dead letter queue** | 5 |
