### Choosing

| | REST | GraphQL | gRPC | tRPC |
|---|---|---|---|---|
| Public API | best | workable | no | no |
| Internal service to service | fine | rarely | best | if both are TS |
| Many client shapes | weak | best | no | no |
| Browser friendly | yes | yes | no | yes |
| Streaming | SSE only | subscriptions | native, both ways | limited |
| Contract enforced | with OpenAPI | yes | yes | by the compiler |
| Caching | HTTP does it | you build it | you build it | you build it |
| Learning cost | lowest | high | medium | low if you know TS |

### The honest default

- **REST for anything public.** It is the only one every consumer already knows how to call
- **gRPC between internal services** when volume or streaming justifies the tooling
- **GraphQL when several clients genuinely need different shapes**, not because it is newer
- Mixing them is normal. A public REST API in front of internal gRPC services is a common and sound shape
