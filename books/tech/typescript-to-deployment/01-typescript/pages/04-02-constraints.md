## Constraints with `extends`

- A bare `T` could be anything, so you cannot touch its properties

```ts
function getId<T>(item: T) {
  return item.id    // Property 'id' does not exist on type 'T'
}
```

- **Constrain** it - say what `T` must at least have

```ts
function getId<T extends { id: string }>(item: T) {
  return item.id    // fine
}

getId({ id: "u1", name: "kaleem" })   // ok
getId({ name: "kaleem" })             // Property 'id' is missing
```

- `T extends { id: string }` reads as: `T` is any type that has an `id` string

### Why not just take a plain parameter?

- Because the generic **remembers the real type**

```ts
function tag<T extends { id: string }>(item: T): T {
  return { ...item, tagged: true } as T
}

const u = tag({ id: "u1", name: "kaleem" })
u.name    // still there. A plain parameter would have lost it
```
