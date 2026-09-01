## Gating, environments and approvals

### The gate

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with: { node-version: 24, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test -- --coverage
      - run: npm audit --audit-level=high

  build:
    needs: test          # nothing builds until this passes
```

- `npx tsc --noEmit` catches type errors that a bundler skips. On a TypeScript project it is the cheapest gate available
