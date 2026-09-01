## Monorepos

- One repository, several deployable things, shared code between them without publishing to npm

### pnpm workspaces, the base layer

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

```json
{ "dependencies": { "@repo/logger": "workspace:*" } }
```

- `workspace:*` links to the local folder instead of downloading anything
- Every other tool here builds on this

### Turborepo

```json
{
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "test": { "dependsOn": ["build"] },
    "typecheck": {}
  }
}
```

- Understands the dependency graph and **caches task output**
- An unchanged package is not rebuilt, locally or in CI. On a large repo that is most of the build time
