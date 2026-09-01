## Recursive types

- Some data has no fixed depth. A JSON value, a comment thread, a category tree, a nested permission object
- A type describing it has to refer to itself, and TypeScript allows that

```ts
type Json =
  | string | number | boolean | null
  | Json[]
  | { [key: string]: Json }

type Category = {
  id: string
  name: string
  children: Category[]
}
```

### Recursive utility types

```ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}
```

- The built-in `Partial` and `Readonly` are one level deep. These go all the way down
- Useful for a nested configuration object where every field is optional
