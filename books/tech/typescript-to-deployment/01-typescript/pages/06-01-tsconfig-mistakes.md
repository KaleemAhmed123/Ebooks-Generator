# Module 6 - Quirks, tips and tricks

## The `tsconfig` mistakes that bite in production

### `target` set too low

- An old `target` makes `tsc` down-level modern syntax it did not need to touch
- Bigger output, slower builds, worse stack traces
- Match `target` to the Node version you actually deploy

### `moduleResolution` not matching `module`

- The two must agree, or imports resolve at build time and fail at runtime
- On Node, set both to `nodenext` and stop thinking about it

### `outDir` missing

- Without it, `tsc` writes `.js` files **next to** your `.ts` files
- Then a stale `index.js` gets imported instead of your source, and you lose an afternoon

### `include` too wide

- `"include": ["."]` pulls in `dist`, test fixtures and config files
- Type-check time climbs and errors appear in files you do not own

### No `typecheck` script

- If you build with `esbuild`, `swc` or `tsx`, **nothing is checking your types**
- Add `tsc --noEmit` as a script and run it in CI

```json
{ "scripts": { "typecheck": "tsc --noEmit" } }
```
