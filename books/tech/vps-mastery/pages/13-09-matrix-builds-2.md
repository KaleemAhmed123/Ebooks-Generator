## Building fifteen services - continued

| Setting | Why |
|---|---|
| `fail-fast: false` | One failing service should not cancel the other eleven |
| `max-parallel: 6` | Concurrency limits are finite. Six is polite and still fast |
| `scope=${{ matrix.service }}` | **Separate cache per service.** Without it they overwrite each other and every build is cold |

### Building only what changed

```yaml
- uses: dorny/paths-filter@v3
  id: changed
  with:
    filters: |
      orders: ['services/orders/**', 'packages/shared/**']
```

- Worth adding once the full matrix takes longer than the patience available. It also means a deploy may mix image tags, so the deploy step must handle that
