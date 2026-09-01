## Conditional types and `infer`

- Sometimes the right type depends on the type that came in
- Unwrapping a promise should give the value inside, and unwrapping something that is not a promise should give it back unchanged
- That is a decision, and a **conditional type** is how the type system expresses one
- It reads as a ternary at the type level: if this type is assignable to that one, use the first branch, otherwise the second
- `infer` goes with it, and it means capture whatever type sits in this position so I can name it
- This is where TypeScript stops describing shapes and starts computing, and it is also where it becomes unreadable if overused

```ts
type IsString<T> = T extends string ? true : false

type A = IsString<"hello">   // true
type B = IsString<42>        // false
```

### `infer` - capture a type from inside another

```ts
type ElementOf<T> = T extends (infer U)[] ? U : never

type A = ElementOf<string[]>   // string
type B = ElementOf<number>     // never
```

- `infer U` says: whatever type sits in that position, call it `U`
