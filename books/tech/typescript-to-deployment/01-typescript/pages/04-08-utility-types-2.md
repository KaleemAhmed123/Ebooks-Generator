### `Awaited<T>` - what a promise resolves to

```ts
async function load() {
  return { id: "u1" }
}

type Loaded = Awaited<ReturnType<typeof load>>
// { id: string }
```

- `Awaited` unwraps nested promises too, all the way down
