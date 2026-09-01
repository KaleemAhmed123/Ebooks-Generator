## Choosing between them

| | Express 5 | Fastify 5 | NestJS 12 | Hono 4 |
|---|---|---|---|---|
| Style | minimal | minimal, schema first | opinionated, DI | minimal, web standard |
| TypeScript | via `@types` | good | native | native, end to end |
| Validation | bring your own | built in | built in | via zod plugin |
| Speed | baseline | roughly 2x | Express or Fastify | very fast |
| Ecosystem | largest | large | large | growing |
| Runs on edge | no | no | no | yes |
| Learning curve | lowest | low | high | low |

### How to actually decide

- **Express** when the team knows it, the ecosystem matters, or you are hiring for it. Still the safe default
- **Fastify** when throughput is measured, or you want schemas driving validation and docs
- **NestJS** on a large team that needs one enforced structure, or when the domain is genuinely complex
- **Hono** when it must run on an edge runtime, or you want typed routes with almost no weight

### The honest part

- Framework choice is rarely why a service is slow
- The database query, the missing index and the three sequential awaits are
