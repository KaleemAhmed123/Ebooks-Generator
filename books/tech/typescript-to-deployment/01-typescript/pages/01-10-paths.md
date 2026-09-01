## `paths` and why they break at runtime

- `paths` lets you write `@/services/user` instead of `../../../services/user`
- It is a **compiler-only** feature

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

- `tsc` understands `@/services/user` and type-checks it happily
- Node does not. It has never heard of `@/`
- So the build succeeds and the server crashes on startup

```bash
node dist/index.js
// Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@'
```

### The three ways out

- **Use Node's own subpath imports** - the `imports` field in `package.json`, which Node actually resolves
- **Bundle the output** with `tsup` or `esbuild`, which rewrites the aliases
- **Skip aliases** and use relative paths

:::note
**Changed in TypeScript 7.** `baseUrl` no longer works as a universal alias mechanism. Anchor your `paths` to the project root instead, and remember that whichever way you go, something other than `tsc` has to resolve them at runtime.
:::
