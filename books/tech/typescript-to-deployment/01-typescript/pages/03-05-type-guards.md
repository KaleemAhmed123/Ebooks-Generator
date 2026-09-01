## User-defined type guards

- Sometimes the check is too complex for `typeof` or `in`
- Write a function that returns `x is Something`, called a **type predicate**

```ts
interface User { id: string; email: string }

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "email" in value
  )
}
```

- The return type `value is User` is the important part
- To the compiler it means: *if this returns true, treat the argument as a `User`*

```ts
function handle(body: unknown) {
  if (isUser(body)) {
    console.log(body.email)   // narrowed to User
  }
}
```

### The catch

- TypeScript **trusts** you. It does not verify the function's logic
- A wrong guard is as dangerous as `as User`
- For anything crossing a trust boundary, use `zod` instead. It generates a correct guard for you
