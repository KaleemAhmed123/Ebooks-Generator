## The `package.json` fields that matter

```json
{
  "name": "orders-service",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "exports": { ".": "./dist/index.js" },
  "engines": { "node": ">=24" },
  "packageManager": "pnpm@10.0.0",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsup src/index.ts",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  }
}
```

| Field | Why |
|---|---|
| `type` | `module` for ESM, absent for CommonJS. Decides how every `.js` is read |
| `exports` | the modern entry map. It also **blocks** deep imports into your internals |
| `engines` | fails the install on the wrong Node, instead of failing at runtime |
| `packageManager` | Corepack enforces one manager across the team |
| `sideEffects` | `false` lets bundlers drop unused modules |

### `dependencies` versus `devDependencies`

- If it runs in production, it is a dependency
- Types, test runners, linters and bundlers are dev
- Getting this wrong doubles your Docker image
