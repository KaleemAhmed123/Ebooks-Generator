### Flags worth knowing

```bash
node --test --test-name-pattern="totals"
node --test --test-only
node --test --test-concurrency=1
node --test --test-shard=1/4          # split across CI machines
```

- Jest is still ahead on snapshots and a large plugin ecosystem
- For a service with plain assertions, the built-in runner is fewer moving parts
