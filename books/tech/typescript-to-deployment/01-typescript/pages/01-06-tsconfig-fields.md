## What each field is doing

- `target` - which JavaScript version is emitted
  - match it to your Node version, not to a browser
- `lib` - which built-in type definitions are available to you
- `module` - how an `import` is emitted
- `moduleResolution` - how an import path is looked up on disk
  - `nodenext` is the only sane pair for a Node service
- `outDir` - where compiled files land
- `rootDir` - where your sources start
- `strict` - turns on the whole strict family in one flag
- `sourceMap` - makes stack traces point at your `.ts` line, not the built one
- `skipLibCheck` - skips type-checking inside `node_modules`
  - not laziness, it saves a large amount of build time

:::note
**Changed in TypeScript 7.** `target: "es5"`, `moduleResolution: "node10"`, `moduleResolution: "classic"` and the `amd` / `umd` / `systemjs` module modes were all removed. `baseUrl` no longer works as a universal alias mechanism. Anchor `paths` to the project root instead.
:::
