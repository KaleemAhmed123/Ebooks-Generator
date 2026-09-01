### `Omit<T, K>` - drop these keys

```ts
type Public = Omit<User, "age">
// { id: string; name: string }
```

- `Omit` is how you build a safe API response type from a database row

### `Record<K, V>` - known keys, one value type

```ts
type Counts = Record<"open" | "closed", number>
// { open: number; closed: number }
```
