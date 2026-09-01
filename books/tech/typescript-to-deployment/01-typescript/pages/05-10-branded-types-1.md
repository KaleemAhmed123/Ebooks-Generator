## Branded types

- A user id and an order id are both strings, so the compiler sees no difference between them
- Passing one where the other belongs compiles perfectly and finds the wrong row, or nothing at all
- The type system cannot help because **structural typing** means two types with the same shape are the same type
- A **branded type** deliberately breaks that by attaching a marker that exists only in the type, never at runtime
- Two strings with different brands stop being interchangeable, so the mistake becomes a compile error
- Nothing is added to the value. The brand is erased with everything else, so it costs nothing at runtime

```ts
type UserId = string
type OrderId = string

function refund(orderId: OrderId) {}

const userId: UserId = "u1"
refund(userId)   // no error. Both are just string
```

- That call is a real bug and nothing catches it

### The brand

- Add a property that exists only in the type, never at runtime

```ts
declare const brand: unique symbol

type Brand<T, B> = T & { readonly [brand]: B }

type UserId = Brand<string, "UserId">
type OrderId = Brand<string, "OrderId">
```

```ts
refund(userId)
// Argument of type 'UserId' is not assignable to 'OrderId'
```
