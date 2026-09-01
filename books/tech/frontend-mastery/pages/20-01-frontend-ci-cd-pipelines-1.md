# Module 20: Deploy And Operate

## Frontend CI/CD Pipelines

A junior developer runs `npm run build` on their laptop and uploads the files via FTP. A senior engineer designs an automated Continuous Integration and Continuous Deployment (CI/CD) pipeline that acts as an unyielding gatekeeper against bad code.

In 2026, you cannot merge code into the `main` branch of a professional codebase without passing a gauntlet of automated checks.

### The CI Pipeline Stages

A standard GitHub Actions pipeline for a frontend repository involves several strict stages:

#### 1. Static Analysis (Linting & Formatting)
The fastest way to fail a build. 
- **ESLint/Biome**: Catches syntax errors, unused variables, and React hook dependency violations.
- **Prettier/Biome**: Enforces strict code formatting. If a developer didn't run the formatter locally, the CI server will reject the PR.
- **TypeScript `tsc --noEmit`**: Checks for type errors across the entire project without compiling the files.

#### 2. Unit & Integration Testing
Using Vitest or Jest, the pipeline runs all isolated tests. 
*Pro-tip:* Use a tool like Istanbul or V8 coverage to enforce a coverage threshold. E.g., `coverage: { branches: 80, functions: 80 }`. If the PR drops coverage below 80%, the build fails.

#### 3. E2E & Visual Regression Testing (Playwright / Cypress)
Unit tests check logic; E2E tests check reality. 
Playwright will spin up headless Chromium, WebKit, and Firefox browsers and physically click through your application.
