## Shipping types with a package

- A shared package in a monorepo, or one published to npm, is useless to a TypeScript consumer unless it ships type declarations
- Without them every import resolves to `any` and the consumer loses every guarantee the package was written to provide

```json
{
  "name": "@repo/orders-client",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "types": "./dist/index.d.ts", "default": "./dist/index.js" }
  },
  "files": ["dist"]
}
```

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "composite": true,
    "outDir": "dist"
  }
}
```

| Option | Does |
|---|---|
| `declaration` | emits the `.d.ts` files |
| `declarationMap` | lets go-to-definition jump to the **source**, not the generated types |
| `composite` | enables project references, so consumers rebuild only what changed |

- `declarationMap` is the one that changes daily life in a monorepo. Without it, clicking a symbol lands in a generated file
