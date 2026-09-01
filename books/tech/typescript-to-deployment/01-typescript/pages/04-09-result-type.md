## Building a typed `Result<T, E>`

- Everything in this module, used once, on a pattern you will actually ship
- The goal: a function that can fail, without `throw` and without `any`

```ts
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E }
```

- A discriminated union from Module 3
- Two type parameters, the second with a default, from this module

### Using it

```ts
async function loadUser(id: string): Promise<Result<User, "not_found">> {
  const row = await db.users.find(id)
  if (!row) return { ok: false, error: "not_found" }
  return { ok: true, value: row }
}
```

```ts
const result = await loadUser("u1")

if (result.ok) {
  console.log(result.value.name)   // value exists here
} else {
  console.log(result.error)        // "not_found"
}
```

### Why bother

- A thrown error is invisible in the signature. Nothing warns the caller it can fail
- A `Result` puts the failure **in the type**, so the caller cannot forget it
- Use it for expected failures. Keep `throw` for genuine bugs
