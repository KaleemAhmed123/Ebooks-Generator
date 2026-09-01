## DTO vs domain model vs database row

- Three shapes that look alike and must not be the same type

| Shape | Where it lives | Owns |
|---|---|---|
| **Row** | the database | columns, `snake_case`, nulls |
| **Domain model** | your service | business rules, real `Date` objects |
| **DTO** | the API edge | what the client is allowed to see |

```ts
interface UserRow {
  id: string
  password_hash: string
  created_at: string
}

interface User {
  id: string
  passwordHash: string
  createdAt: Date
}

type UserDto = Omit<User, "passwordHash">
```

### Why keep them separate

- The row has `password_hash`. Send it once and you have a breach
- `Omit` makes the DTO derive from the model, so a new secret field is excluded by default only if you say so. Which is why the DTO is defined as a subtraction, not a copy

```ts
function toDto(user: User): UserDto {
  const { passwordHash, ...dto } = user
  return dto
}
```

- One mapping function per boundary
- Structural typing will happily let a row become a response if you skip this. See Module 2
