# Module 11 - Tooling

## Running and building TypeScript

- Node cannot run TypeScript with its types intact, so something has to remove them, and three separate jobs get confused with one another
- **Type checking** asks whether the code is correct. It is slow, and it is the only one of the three that finds bugs
- **Transpiling** strips the types so the code can run. It is fast, and it checks nothing
- **Bundling** collects your files and their dependencies into one deployable artifact
- `tsc` does the first two. The fast tools do the second and third using esbuild or swc, written in Go and Rust
- They are fast precisely because they skip type checking, which is why a build that only ran esbuild has verified nothing
- The arrangement that works is transpile for the fast feedback loop, type check separately in CI, bundle for the deploy

### tsx 4.23.13, for development

```bash
npx tsx watch src/index.ts
```

- Strips types with esbuild and runs immediately. It does **not** type check, which is what makes it instant
- Node's own `--watch` plus native type stripping does the same for simple projects

### tsup 8.5.1, for a deployable bundle

```ts
// tsup.config.ts
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node24",
  sourcemap: true,
  clean: true,
})
```

- Bundles to one file with a source map. Fast, because esbuild does the work
- `tsdown` 0.22 is its successor from the same author, built on Rolldown
