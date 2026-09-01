## Typing async code

- An `async` function always returns a `Promise`
- You annotate what it resolves to, not the promise itself

```ts
async function loadUser(id: string): Promise<User> {
  const row = await db.users.find(id)
  return row
}
```

- Leaving the return type off is fine. It is inferred as `Promise<User>`
- Writing it down is better on exported functions: it stops an accidental change to the shape

### `Awaited` for the reverse direction

```ts
type Loaded = Awaited<ReturnType<typeof loadUser>>   // User
```

### `Promise.all` keeps each type

```ts
const [user, orders] = await Promise.all([
  loadUser("u1"),      // Promise<User>
  loadOrders("u1"),    // Promise<Order[]>
])

user.name      // User
orders.length  // Order[]
```

- The tuple positions are preserved, so each variable keeps its own type
