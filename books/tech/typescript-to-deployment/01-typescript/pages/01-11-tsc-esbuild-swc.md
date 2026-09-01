## `tsc` vs `esbuild` vs `swc`

- All three turn TypeScript into JavaScript
- Only one of them **checks** anything

| Tool | Written in | Type-checks? | Speed |
|---|---|---|---|
| `tsc` | Go (since v7) | **Yes** | fast |
| `esbuild` | Go | No | very fast |
| `swc` | Rust | No | very fast |

- `esbuild` and `swc` simply delete the types and move on
- They are **transpilers**, not compilers
- An error like `greet(42)` sails straight through both of them

### The pattern teams actually use

- Build with `esbuild` or `swc` - fast feedback in development
- Type-check with `tsc --noEmit` - in a separate script and in CI

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsup src/index.ts",
    "typecheck": "tsc --noEmit"
  }
}
```

- `--noEmit` means "check everything, write no files"
- If `typecheck` is not in your CI, nothing is checking your types
