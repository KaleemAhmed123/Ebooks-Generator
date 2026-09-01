### The database, which is the real constraint

| Migration was | Rollback is |
|---|---|
| **additive** (new nullable column, new table) | safe. Old code ignores it |
| **backfill only** | safe |
| **a rename or a drop** | **the old code cannot run.** You are going forward, not back |
| **a type change** | usually unrecoverable without a restore |

- **This is why Module 10 insists on expand before contract.** It is not theory; it is what makes a rollback possible at all
- **If the migration is not backward compatible, the only paths are fix forward or restore from the snapshot you took before deploying**

### After a rollback

```bash
curl -s https://api.example.com/health | jq .version      # confirm the old version is live
```

- **Confirm the error rate actually recovered.** If it did not, the deploy was not the cause and the real incident is still running
- **Do not immediately redeploy the same commit.** Find the cause first, on a branch
