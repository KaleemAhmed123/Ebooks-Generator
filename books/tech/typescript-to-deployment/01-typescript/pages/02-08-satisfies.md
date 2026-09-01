## `satisfies`

- Annotating a value with a type checks it and then widens it, so you lose the specifics you just wrote
- Leaving the annotation off keeps the specifics but checks nothing, so a typo in a key goes unnoticed
- Neither option gives you both, which is the problem `satisfies` was added to solve
- It checks the value against a type without replacing the inferred type
- So a config object can be verified as complete and still remember exactly which keys it has

```ts
type Routes = Record<string, string>

const routes: Routes = {
  home: "/",
  user: "/users/:id",
}

routes.home     // string  <- the exact value was lost
routes.typo     // no error. Record<string, string> allows any key
```

### `satisfies` checks without flattening

```ts
const routes = {
  home: "/",
  user: "/users/:id",
} satisfies Record<string, string>

routes.home     // "/"     <- exact value kept
routes.typo     // Property 'typo' does not exist
```

- `satisfies` verifies the object matches the type
- Then it lets the **inferred** type stand, instead of replacing it

### When to reach for it

- Config objects
- Route tables, permission maps, feature flags
- Anywhere you want validation *and* precise autocomplete
