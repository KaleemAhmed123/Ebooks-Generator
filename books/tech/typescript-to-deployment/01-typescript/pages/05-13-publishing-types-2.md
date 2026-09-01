### Project references

```json
{ "references": [{ "path": "../orders-client" }] }
```

- The consumer type-checks against the dependency's built output rather than recompiling its sources
- On a large monorepo that is the difference between a fast check and a slow one

### The rule

- **Never publish a package whose types are `any`.** Run `tsc --noEmit` against a consumer as part of CI
- `attw`, are-the-types-wrong, checks that your `exports` map resolves correctly under every module setting
