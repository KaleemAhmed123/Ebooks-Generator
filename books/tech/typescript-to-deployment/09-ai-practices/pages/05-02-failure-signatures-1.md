## What to look for

- Generated code fails in recognizable ways. **Knowing the signatures turns review from reading everything into looking for six things**

### 1. The API that does not exist

```ts
await db.order.findManyWithRelations({ ... })   // not a Prisma method
res.sendStatus(200).json(body)                  // not chainable
```

- **Types and tests catch most of these.** The dangerous ones are in untyped edges: a config key, an environment variable, a CLI flag, an SQL function

### 2. Plausible but inverted logic

```ts
if (attempts >= MAX_ATTEMPTS) { scheduleRetry() }   // should be <
```

- Reads correctly, does the opposite. **Check every boundary condition and every negation by hand**

### 3. The silent extra change

- A refactor of a neighbouring function, a renamed variable, a reordered import block, a changed default
- **Nothing in the diff says it was unrequested.** Compare against the plan, not against your memory

### 4. The unnecessary abstraction

- An interface with one implementation, a factory for one product, a config option nobody will change
