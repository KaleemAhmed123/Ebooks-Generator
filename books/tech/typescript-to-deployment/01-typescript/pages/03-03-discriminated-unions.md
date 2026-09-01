## Discriminated unions

- The single most useful pattern in backend TypeScript
- A union of object types that share one **literal** property telling them apart

```ts
type Result =
  | { status: "ok"; data: User }
  | { status: "error"; message: string }
```

- `status` is the **discriminant**
- Checking it narrows the whole object

```ts
function handle(r: Result) {
  if (r.status === "ok") {
    console.log(r.data)      // TypeScript knows data exists here
  } else {
    console.log(r.message)   // and message exists here
  }
}
```

### Why this beats optional properties

```ts
// the loose version - both fields optional, both always maybe-undefined
type Result = { ok: boolean; data?: User; message?: string }
```

- With the loose version you check `ok`, then still have to check `data`
- With the discriminated union, checking `status` is enough
- Impossible states - `ok: true` with no `data`. Cannot be constructed at all
