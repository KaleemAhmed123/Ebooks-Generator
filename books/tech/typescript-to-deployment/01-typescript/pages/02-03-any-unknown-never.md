## `any` vs `unknown` vs `never`

- These three look similar and behave nothing alike

### `any` - turns checking off

```ts
let value: any = "hello"
value.toFixed(2)      // compiles. Crashes at runtime
```

- `any` is a hole in the type system
- Every `any` you allow spreads to everything it touches

### `unknown` - the honest version of `any`

```ts
let value: unknown = "hello"
value.toFixed(2)      // 'value' is of type 'unknown'

if (typeof value === "number") {
  value.toFixed(2)    // fine, it is a number in here
}
```

- `unknown` also holds anything, but you must **prove** what it is before using it
- This is what you want for a request body, a `JSON.parse` result, or a caught error

### `never` - the value that cannot exist

```ts
function fail(msg: string): never {
  throw new Error(msg)
}
```

- A function that always throws returns `never`
- It is also what is left when you have narrowed away every possibility
- That property is what makes exhaustiveness checking work, in Module 3
