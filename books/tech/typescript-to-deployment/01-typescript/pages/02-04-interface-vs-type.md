## `interface` vs `type`

- Both name a shape. Most of the time they are interchangeable

```ts
interface User {
  name: string
  age: number
}

type User = {
  name: string
  age: number
}
```

### What only `interface` can do

- **Declaration merging** - declare it twice and the members combine

```ts
interface Request { body: unknown }
interface Request { user?: { id: string } }
// Request now has both
```

- That is exactly how you add `req.user` to Express, covered in Module 5

### What only `type` can do

- Unions, intersections, tuples, mapped types, conditional types

```ts
type Status = "open" | "closed"
type Id = string | number
type Pair = [string, number]
```

### The rule of thumb

- Use `interface` for object shapes that others may extend
- Use `type` for everything else
- Do not spend meeting time on this
