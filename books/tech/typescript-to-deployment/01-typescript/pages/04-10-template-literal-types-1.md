## Template literal types

- Some strings have a shape. A route is `/api/v1/orders`, an event is `order.paid`, a header key is `x-request-id`
- Typing them as `string` accepts every typo. Listing every value by hand does not scale and goes stale
- A **template literal type** describes the pattern, so the compiler can generate and check the members

```ts
type Entity = "order" | "seller" | "shipment"
type Action = "created" | "updated" | "cancelled"

type EventName = `${Entity}.${Action}`
// "order.created" | "order.updated" | ... nine members, generated

function emit(name: EventName) {}

emit("order.paid")      // Argument of type '"order.paid"' is not assignable
emit("order.created")   // ok
```

### Deriving keys from other keys

```ts
type Order = { id: string; total: number }

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

type OrderGetters = Getters<Order>
// { getId: () => string; getTotal: () => number }
```

- `as` inside a mapped type **renames** the key, and template literals build the new name
- `Capitalize`, `Uppercase`, `Lowercase` and `Uncapitalize` are built in for exactly this
