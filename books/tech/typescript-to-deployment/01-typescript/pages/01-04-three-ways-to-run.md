## Three ways to run it

```bash
npx tsc hello.ts && node hello.js   # compile, then run
npx tsx hello.ts                    # run directly, no build step
node hello.ts                       # Node runs .ts on its own now
```

- `tsc` is the compiler - it type-checks **and** emits JavaScript
- `tsx` runs the file straight away, stripping types without checking them
- Node now strips types on its own
  - `--experimental-strip-types` in v22.6
  - unflagged in v22.18
  - on by default from v23.6, and in v24

### The catch

- `tsx` and Node only **remove** types. Neither one checks them
- So keep `tsc` in your build or your CI, or nothing is checking anything

:::note
Type stripping only handles syntax that can be *erased*. `enum`, parameter properties and `namespace` emit real JavaScript, so Node refuses them. Set `erasableSyntaxOnly` in your config and `tsc` rejects that syntax at build time, instead of Node rejecting it in production.
:::
