## `strict`, flag by flag

- `strict: true` switches on a family of checks in one line
- Turn it on from day one - retrofitting it into a large codebase is painful

### What it turns on

- `strictNullChecks` - `null` and `undefined` stop being assignable to everything
- `strictFunctionTypes` - function parameters are checked properly
- `strictBindCallApply` - `bind`, `call` and `apply` get real type checking
- `strictPropertyInitialization` - a class field must be assigned before use
- `noImplicitAny` - a value the compiler cannot infer becomes an error, not `any`
- `noImplicitThis` - `this` must have a known type
- `alwaysStrict` - emits `"use strict"` in every file
- `useUnknownInCatchVariables` - a caught error is `unknown`, not `any`

```ts
// noImplicitAny off:  id is silently any
function find(id) { return db.get(id) }

// noImplicitAny on:   Parameter 'id' implicitly has an 'any' type
function find(id: string) { return db.get(id) }
```

- The last one, `useUnknownInCatchVariables`, is the one people trip on
- It is also the correct behavior - anything at all can be thrown in JavaScript
