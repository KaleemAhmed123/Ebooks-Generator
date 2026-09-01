## Four more worth knowing

### `updateTag` gives you read-your-writes

- Before this, a form save either showed stale data or you reached for `router.refresh()`
- `updateTag` expires and refreshes in the same request, so the user sees their own edit

### Turbopack is the default, including for builds

- No `--turbopack` flag needed
- If your build suddenly fails after upgrading, a plugin is probably injecting a `webpack` config. Next.js fails loudly rather than ignoring it
- `--webpack` opts back out

### Turbopack caches to disk between runs

- On by default for `dev` and `build`
- A restart no longer means a cold compile

### `next lint` is gone

- Run ESLint or Biome directly, and `next build` no longer lints
- Builds are faster, and lint failures stop blocking a deploy

```bash
npx @next/codemod@canary next-lint-to-eslint-cli .
```
