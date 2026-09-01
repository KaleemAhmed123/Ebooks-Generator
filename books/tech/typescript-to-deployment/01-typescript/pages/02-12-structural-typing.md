## Structural typing

- TypeScript compares types by their **shape**, not by their name
- Other languages call this duck typing. If it has the members, it fits

```ts
interface Point { x: number; y: number }

function print(p: Point) {
  console.log(p.x, p.y)
}

const thing = { x: 1, y: 2, color: "red" }

print(thing)   // fine. It has x and y
```

- `thing` was never declared as a `Point` and does not need to be
- Extra properties are allowed, because it still satisfies the shape

### Why this matters on a backend

- A database row, a DTO and a domain model can be structurally identical
- TypeScript will happily let you pass one where another is expected
- That is convenient, and it is also how the wrong object reaches the wrong layer

```ts
interface UserRow { id: string }
interface OrderRow { id: string }

const order: OrderRow = { id: "o1" }
const user: UserRow = order    // no error. Same shape
```

- **Branded types** solve this, and they are in Module 5
