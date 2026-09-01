## The database both colors share

- There is one database. Blue and green both write to it, at the same time, during the flip
- **This is the constraint that makes blue-green harder than it looks**, and it cannot be engineered away on one box

### What must hold during every deploy

| Rule | Consequence of breaking it |
|---|---|
| The new schema works with the old code | Blue starts failing the moment the migration runs |
| The old schema works with the new code | Green fails its health check and never goes live |
| No destructive change in the same deploy | A rollback finds the column gone |

- This is exactly the expand-and-contract discipline from page 12-09. Blue-green is what makes it mandatory rather than merely wise

### Where the migration runs

```bash
docker compose -p "app-${NEXT}" run --rm migrate
```

- After the new color is pulled, **before** it starts serving. It is additive, so blue continues working against the migrated schema

### The deploy that cannot be zero downtime

- A migration that rewrites a large table locks it. No amount of proxy switching hides a locked table
- Options, in order of preference:
  1. Split it into additive steps that each complete quickly
  2. Backfill in batches from a background job, outside a deploy
  3. Accept a maintenance window, announced in advance
