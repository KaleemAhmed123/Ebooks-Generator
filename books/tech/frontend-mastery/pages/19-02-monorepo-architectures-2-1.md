### Structuring a Monorepo

A modern frontend monorepo (often using `pnpm workspaces`) is typically structured by boundaries:

```text
my-monorepo/
├── apps/
│   ├── web/               (Next.js customer-facing app)
│   ├── admin-dashboard/   (Vite internal dashboard)
│   └── docs/              (Astro documentation site)
├── packages/
│   ├── ui/                (Shared React design system)
│   ├── utils/             (Shared math/formatting logic)
│   ├── eslint-config/     (Shared linting rules)
│   └── typescript-config/ (Shared tsconfig.json bases)
└── pnpm-workspace.yaml
```

Because everything is in one repo, if you change a button component in `packages/ui`, you instantly get type-errors in `apps/web` if your change broke the API. You can atomically commit the fix across the entire ecosystem in a single Pull Request.

### Task Orchestration

In a monorepo, `apps/web` depends on `packages/ui`. 
If you run `build` on the whole workspace, the orchestrator (Nx/Turbo) reads the dependency graph and knows it must finish building `packages/ui` *before* it can start building `apps/web`. 

It will automatically run these tasks in the correct topological order, using every CPU core to run independent tasks at once (like building the `docs` app at the same time as `packages/ui`).
