## Utility types - the union and function ones

### `Exclude<T, U>` - remove members from a union

```ts
type Status = "open" | "closed" | "archived"

type Active = Exclude<Status, "archived">   // "open" | "closed"
```

### `Extract<T, U>` - keep only matching members

```ts
type Text = Extract<string | number | boolean, string>   // string
```

### `NonNullable<T>` - strip null and undefined

```ts
type Name = NonNullable<string | null | undefined>   // string
```

### `ReturnType<F>` - what a function gives back

```ts
function makeUser() {
  return { id: "u1", name: "kaleem" }
}

type User = ReturnType<typeof makeUser>
// { id: string; name: string }
```

- Very useful: derive the type from the function instead of maintaining both

### `Parameters<F>` - a function's arguments as a tuple

```ts
function send(to: string, body: string) {}

type Args = Parameters<typeof send>   // [to: string, body: string]
```
