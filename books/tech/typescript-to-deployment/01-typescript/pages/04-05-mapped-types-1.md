## Mapped types

- Types often differ from one another by a rule rather than by content
- An update type is the create type with every field optional. A read-only view is the same type with every field frozen
- Writing both by hand means two definitions that drift the moment a field is added to one
- A **mapped type** produces one type from another by walking its keys and applying a rule to each
- It is a loop over a type, and it is what every utility type in the previous pages is built from

```ts
type Loose<T> = {
  [K in keyof T]?: T[K]
}
```

- `[K in keyof T]` loops over every key
- `T[K]` is that key's type
- `?` makes each one optional

```ts
interface User { id: string; name: string }

type LooseUser = Loose<User>
// { id?: string; name?: string }
```

### Modifiers

```ts
type Freeze<T> = { readonly [K in keyof T]: T[K] }    // add readonly
type Thaw<T>   = { -readonly [K in keyof T]: T[K] }   // remove it
type Firm<T>   = { [K in keyof T]-?: T[K] }           // remove optional
```

- A `-` before `readonly` or `?` strips the modifier instead of adding it
