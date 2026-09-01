## Default type parameters

- A type parameter can have a default, just like a function argument

```ts
interface ApiResponse<T = unknown> {
  status: number
  body: T
}

const a: ApiResponse = { status: 200, body: "anything" }
const b: ApiResponse<User> = { status: 200, body: user }
```

- `T = unknown` means callers can skip it
- Pick `unknown` as the default, not `any`. It stays honest

### Multiple parameters

```ts
interface Envelope<T, E = Error> {
  ok: boolean
  value?: T
  error?: E
}

type UserEnvelope = Envelope<User>              // E is Error
type ParseEnvelope = Envelope<User, string[]>   // E is string[]
```

- Parameters with defaults must come after those without
- Same rule as function arguments
