## `import type`, and why bundlers care

- A normal import of a type still looks like a real import to a bundler

```ts
import { User } from "./models/user.js"
```

- The compiler knows `User` was only a type and drops it
- But `esbuild`, `swc` and Node's type stripping work **one file at a time**
- They cannot see whether `User` was a type or a value, so they keep the import
- You end up with a runtime import of a module you never needed, and sometimes a cycle

### Say it explicitly

```ts
import type { User } from "./models/user.js"
import { save, type Options } from "./repo.js"
```

- `import type` is erased with certainty
- The inline `type` modifier does the same for one specifier in a mixed import

### Make the compiler enforce it

```json
{ "compilerOptions": { "verbatimModuleSyntax": true } }
```

- Now `tsc` emits imports exactly as you wrote them
- Any import that is types-only must say `type`, or it stays in the output
- This is the setting that makes single-file transpilers behave predictably
