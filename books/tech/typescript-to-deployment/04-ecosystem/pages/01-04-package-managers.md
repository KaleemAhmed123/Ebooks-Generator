## npm, pnpm, yarn and bun

| | Install speed | Disk | Strict | Notes |
|---|---|---|---|---|
| npm | baseline | a copy per project | no | ships with Node |
| pnpm | fastest | one global store, hard linked | yes | the default choice for monorepos |
| yarn | fast | plug-n-play optional | yes | berry is a different tool to yarn 1 |
| bun | fastest | own store | partial | also a runtime and test runner |

### Why pnpm is worth the switch

- A **content addressable store**. Ten projects using express 5.2.1 store it once
- **Strict by default.** A package you did not declare is not importable

```js
import lodash from "lodash"   // works on npm even if you never installed it
                              // fails on pnpm, which is correct
```

- npm builds a flat `node_modules`, so a transitive dependency is importable by accident
- The day that transitive dependency is removed, your code breaks and nothing explains why

### Pinning the manager

```json
{ "packageManager": "pnpm@10.0.0" }
```

- Corepack reads this and uses the right one, so a teammate cannot half-install with npm
