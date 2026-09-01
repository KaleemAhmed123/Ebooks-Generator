### `Promise.allSettled` gives you a discriminated union

```ts
const results = await Promise.allSettled([loadUser("u1")])

for (const r of results) {
  if (r.status === "fulfilled") console.log(r.value)
  else console.log(r.reason)
}
```

- `status` is the discriminant, exactly the pattern from Module 3
