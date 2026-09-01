## Assertion functions

- A type guard returns a boolean
- An **assertion function** throws instead, and narrows everything after the call

```ts
function assertIsUser(value: unknown): asserts value is User {
  if (!isUser(value)) throw new Error("not a user")
}
```

- The return type is `asserts value is User`
- After the call, the variable is narrowed for the rest of the scope

```ts
function handle(body: unknown) {
  assertIsUser(body)

  console.log(body.email)   // body is User from here down
}
```

### Why this reads better

- No nesting, no `if` pyramid
- The happy path stays flat, and the failure exits early

### The one rule that catches people

- The variable must have an **explicit type annotation** where it is declared
- An inferred `let` will not narrow through an assertion function

```ts
const body: unknown = await req.json()   // annotate it
assertIsUser(body)
```
