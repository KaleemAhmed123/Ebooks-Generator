## The anatomy of a workflow

- A workflow is a YAML file in `.github/workflows/`. It has **triggers**, **jobs**, and inside each job a list of **steps**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
  workflow_dispatch:            # a manual run button

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm test
```
