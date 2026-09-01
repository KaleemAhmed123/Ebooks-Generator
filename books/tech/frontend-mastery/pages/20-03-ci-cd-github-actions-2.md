### GitHub Actions
GitHub Actions is the industry standard tool for CI/CD because it is built directly into GitHub. You configure it by creating a YAML file inside the `.github/workflows/` directory.

```yaml
name: Frontend CI

on:
  pull_request:
    branches: [ main ]

jobs:
  build_and_test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v7

    - name: Setup Node.js
      uses: actions/setup-node@v7
      with:
        node-version: '24'

    - name: Install Dependencies
      run: npm ci

    - name: Run ESLint
      run: npm run lint

    - name: Run TypeScript Compiler
      run: npx tsc --noEmit

    - name: Run Jest Unit Tests
      run: npm run test
```

By mastering GitHub actions, you transition from being someone who just writes code, to someone who designs the infrastructure that *ships* the code.
