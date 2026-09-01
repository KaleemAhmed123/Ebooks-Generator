## Utility types - the shape ones

- These ship with TypeScript
- All of them are mapped types you could have written yourself

```ts
interface User {
  id: string
  name: string
  age: number
}
```

### `Partial<T>` - everything optional

```ts
type Draft = Partial<User>
// { id?: string; name?: string; age?: number }
```

- The natural type for a `PATCH` body or an update function

### `Required<T>` - everything mandatory

```ts
type Complete = Required<Draft>   // back to all required
```

### `Readonly<T>` - nothing reassignable

```ts
type Frozen = Readonly<User>
```

### `Pick<T, K>` - keep only these keys

```ts
type Preview = Pick<User, "id" | "name">
// { id: string; name: string }
```
