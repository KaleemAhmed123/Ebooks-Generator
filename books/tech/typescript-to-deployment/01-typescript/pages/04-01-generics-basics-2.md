## Generics - continued

```ts
// the generic version
function first<T>(items: T[]): T | undefined {
  return items[0]
}

const b = first(["x"])      // string | undefined
const c = first([1, 2, 3])  // number | undefined
```

- `<T>` declares the type parameter
- `items: T[]` uses it, and `T | undefined` returns it
- `T` is not special - it is just a conventional name

### Reading it out loud

> `first` takes an array of some type `T`, and gives you back a `T` or nothing.

- The caller never writes `T`. TypeScript infers it from the argument
