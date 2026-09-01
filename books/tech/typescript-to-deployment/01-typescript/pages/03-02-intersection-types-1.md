## Intersection types

- An intersection means "all of these at once"
- Written with `&`

```ts
interface Timestamps {
  createdAt: Date
  updatedAt: Date
}

interface User {
  id: string
  email: string
}

type UserRecord = User & Timestamps
```

- A `UserRecord` must have all four properties

```ts
const row: UserRecord = {
  id: "u1",
  email: "a@b.com",
  createdAt: new Date(),
  updatedAt: new Date(),
}
```
