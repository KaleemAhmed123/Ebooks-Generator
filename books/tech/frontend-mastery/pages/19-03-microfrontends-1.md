## Monorepos

- When an organization grows to multiple frontend applications (e.g., a buyer app, a seller app, and an admin dashboard), they usually share code. They share the `Button` component, the `apiClient`, and the `formatCurrency` utility
- If these apps live in separate Git repositories, sharing code requires publishing internal NPM packages, versioning them, and manually upgrading them in every app
- **Monorepos** solve this by keeping all apps and shared libraries in a single Git repository

### Monorepo Tooling (Nx and Turborepo)

- A monorepo is not just "putting folders next to each other". It requires dedicated build tooling like **Nx** or **Turborepo**
- If you change the `formatCurrency` utility, how do you know which apps to rebuild?
- Tooling analyzes your import graph and knows exactly which apps depend on the changed code. It only runs tests and builds for the affected applications, heavily reducing CI time

```json
// Example Turborepo pipeline configuration (turbo.json)
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"], // Build dependencies before building the app
      "outputs": [".next/**", "dist/**"] // Cache these outputs
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

## Microfrontends and Module Federation

- Monorepos solve the code-sharing problem, but they create a new bottleneck: deployment
- If the Checkout team and the Catalog team work in the same Next.js application, they must deploy together. If the Checkout team introduces a fatal crash, they roll back the Catalog team's new feature with it
- **Microfrontends** split a monolithic frontend into independent applications that can be built, tested, and deployed entirely separately, but appear to the user as one cohesive website
