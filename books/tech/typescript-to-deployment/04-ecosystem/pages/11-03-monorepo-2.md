### Nx

- Everything Turborepo does, plus code generators, dependency graph visualization and enforced module boundaries
- Heavier to learn, and the better choice on a large team where structure needs enforcing

### The problem it actually solves

- Shared types between an API and its client that cannot drift
- One atomic commit changing a service and its consumer together
- One lint, test and build configuration instead of six copies going stale
