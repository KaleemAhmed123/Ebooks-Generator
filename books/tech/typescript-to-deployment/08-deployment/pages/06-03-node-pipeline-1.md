## A real Node pipeline

```yaml
jobs:
  check:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    services:
      postgres:
        image: postgres:18-alpine
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test
        options: >-
          --health-cmd pg_isready
          --health-interval 5s
          --health-retries 10
        ports: ['5432:5432']
      redis:
        image: redis:8-alpine
        ports: ['6379:6379']

    env:
      DATABASE_URL: postgres://postgres:test@localhost:5432/test
      REDIS_URL: redis://localhost:6379

    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }

      - run: npm ci
      - run: npx tsc --noEmit
      - run: npx eslint .
      - run: npx prisma migrate deploy
      - run: npm test -- --coverage

      - if: always()
        uses: actions/upload-artifact@v4
        with: { name: coverage, path: coverage/ }
```
