## Testing your types

- A unit test checks behavior at runtime
- Your types are gone by then, so tests never touch them

### The cheapest check - `@ts-expect-error`

- It errors if the line **does not** error
- So it is a test that fails when someone accidentally widens a type

```ts
// @ts-expect-error - email is not a key of User
pick(user, "email")
```

- If someone later adds `email` to `User`, this line stops erroring
- And `@ts-expect-error` then fails the build, telling you the test is stale

### Asserting an exact type

```ts
type Expect<T extends true> = T
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false

type _ = Expect<Equal<ReturnType<typeof makeUser>, User>>
```

- Ugly, and it is the standard trick
- The libraries `expect-type` and `tsd` wrap this in something readable

### What is worth testing

- Public generic helpers, where inference is the whole feature
- Types generated from a schema - that `z.infer` still produces what you expect
- Not your DTOs. Those are checked every time they are used
