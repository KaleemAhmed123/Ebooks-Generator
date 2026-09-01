### Remapping the keys

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

type UserGetters = Getters<User>
// { getId: () => string; getName: () => string }
```

- This is how the built-in utility types are written. There is no magic in them
