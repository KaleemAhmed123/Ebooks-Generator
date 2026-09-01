## Literal types and `as const`

### A literal type

- A type that is one exact value

```ts
type Method = "GET" | "POST"

let m: Method = "GET"
m = "PATCH"    // Type '"PATCH"' is not assignable to type 'Method'
```

- This is where TypeScript earns its keep on a backend. No more typo'd status strings

### The widening problem

```ts
const config = { method: "GET" }

fetch(url, config)
// Type 'string' is not assignable to type 'Method'
```

- `config.method` was inferred as `string`, not `"GET"`
- Because the object property is mutable, so it could become anything

### `as const` fixes it

```ts
const config = { method: "GET" } as const

// config is { readonly method: "GET" }
```

- `as const` says: infer the narrowest possible type, and make it all `readonly`
- It works on objects, arrays and single values

```ts
const roles = ["admin", "user"] as const
type Role = typeof roles[number]      // "admin" | "user"
```
