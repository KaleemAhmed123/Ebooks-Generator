## Anatomy of a workflow

- A workflow is a YAML file in `.github/workflows/`. GitHub runs it on an event

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: deploy-production
  cancel-in-progress: false

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment: production
    steps:
      - run: echo "deploying"
```
