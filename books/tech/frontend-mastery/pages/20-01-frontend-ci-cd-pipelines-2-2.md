### Example GitHub Action Workflow

```yaml
name: Frontend CI
on: [pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      
      # Install Node and pnpm
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v7
        with:
          node-version: '24'
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      
      # Stage 1: Fast static checks
      - run: pnpm lint
      - run: pnpm typecheck

      # Stage 2: Unit tests
      - run: pnpm test:coverage

      # Stage 3: Build & Size Check
      - run: pnpm build
      - run: pnpm size-limit
      
      # Stage 4: Playwright E2E
      - run: pnpm exec playwright install --with-deps
      - run: pnpm test:e2e
```

### Preview Deployments (The CD phase)
Once the CI checks pass, CD (Continuous Deployment) kicks in. Platforms like Vercel, Netlify, or AWS Amplify automatically build the code in the PR and deploy it to a unique, temporary URL (a "Preview Deployment"). 
This allows Product Managers, Designers, and QA teams to interact with the live changes before they are ever merged into production.
