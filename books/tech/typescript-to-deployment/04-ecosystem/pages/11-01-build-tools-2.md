### tsc, for the check

```json
{ "scripts": { "typecheck": "tsc --noEmit" } }
```

- The only one of the three that actually verifies your types
- Run it in CI. A build that only ran esbuild has never checked anything

### The split that trips people up

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "typecheck": "tsc --noEmit",
    "build": "tsup",
    "start": "node dist/index.js"
  }
}
```

- Fast feedback in development, real checking in CI, a small artifact for production
