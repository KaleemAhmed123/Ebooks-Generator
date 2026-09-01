## `keyof`, `typeof` and indexed access

### `keyof` - the union of an object type's keys

```ts
interface User { id: string; name: string; age: number }

type UserKey = keyof User     // "id" | "name" | "age"
```

### `typeof` - the type of a value

- This is the **type-level** `typeof`, not the JavaScript operator

```ts
const config = { port: 3000, host: "localhost" }

type Config = typeof config   // { port: number; host: string }
```

### Indexed access - the type of one property

```ts
type Name = User["name"]          // string
type Values = User[keyof User]    // string | number
```

### Put together: a type-safe getter

```ts
function pick<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user: User = { id: "u1", name: "kaleem", age: 27 }

pick(user, "name")   // string
pick(user, "age")    // number
pick(user, "email")  // Argument of type "email" is not assignable
```

- The return type changes with the key you pass. That is the payoff
