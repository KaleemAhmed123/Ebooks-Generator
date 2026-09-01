## Why `strictNullChecks: false` undoes the whole point

- With it off, `null` and `undefined` are assignable to **every** type

```ts
// strictNullChecks: false
const user: User = null      // no error
user.name                    // no error. Crashes at runtime
```

- The most common runtime error in JavaScript is reading a property of `undefined`
- Turning this flag off means TypeScript stops looking for exactly that

### With it on

```ts
const user: User = null
// Type 'null' is not assignable to type 'User'

function find(id: string): User | null { ... }

const u = find("u1")
u.name          // 'u' is possibly 'null'

if (u) u.name   // fine
```

- The type now tells the truth: this function might not find anything

### Turning it on in an existing codebase

- Do not flip it repo-wide on a Friday
- Enable `strict` in a new `tsconfig` that `include`s one folder, and grow the folder
- Or use `// @ts-expect-error` on the failures and burn them down over sprints
  - `@ts-expect-error` beats `@ts-ignore`, because it errors when the problem is fixed
