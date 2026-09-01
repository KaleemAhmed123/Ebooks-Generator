### How it differs from Prisma

| | Prisma | Drizzle |
|---|---|---|
| Schema | its own `.prisma` file | TypeScript |
| Client | generated, needs a build step | none, types are inferred |
| Query style | object options | reads like SQL |
| Bundle | large engine | very small |
| Edge and serverless | needs an adapter | works directly |

- Prisma is friendlier to learn and has better tooling, including Studio
- Drizzle is the one to pick when you already know SQL and want no generation step
