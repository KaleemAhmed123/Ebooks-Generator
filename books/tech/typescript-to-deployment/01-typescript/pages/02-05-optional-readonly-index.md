## Optional, `readonly` and index signatures

### Optional properties

```ts
interface User {
  name: string
  nickname?: string     // may be missing
}
```

- `nickname` has type `string | undefined`
- With `strictNullChecks` on, you must check it before using it

### `readonly`

```ts
interface Config {
  readonly port: number
}

config.port = 4000   // Cannot assign to 'port', it is read-only
```

- Compile-time only. Nothing stops a plain JavaScript caller
- Still worth it - it documents intent and catches your own mistakes

### Index signatures

- For an object whose keys you do not know ahead of time

```ts
interface Headers {
  [key: string]: string
}

const h: Headers = { "content-type": "application/json" }
h["x-request-id"] = "abc"
```

- Prefer `Record<string, string>` - it says the same thing more clearly
- Prefer a real union of keys when you actually know them
