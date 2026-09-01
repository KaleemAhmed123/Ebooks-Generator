### A practical one

```ts
type Unwrap<T> = T extends Promise<infer U> ? U : T

type A = Unwrap<Promise<User>>   // User
type B = Unwrap<User>            // User
```

- That is `Awaited` in miniature, which is two pages away

### Distribution - the surprise

```ts
type NoNull<T> = T extends null | undefined ? never : T

type A = NoNull<string | null>   // string
```

- A conditional type applied to a union runs **once per member**
- Usually what you want. Occasionally the source of a confusing result
