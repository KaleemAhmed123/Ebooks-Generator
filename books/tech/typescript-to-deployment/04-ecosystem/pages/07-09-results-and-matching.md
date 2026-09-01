## Results and pattern matching

- A thrown error is invisible to the type system. A function's signature says it returns an `Order`, and says nothing about the four ways it can fail
- The caller has no way of knowing a `try` is needed, and TypeScript will never tell them
- A **Result type** makes failure part of the return value instead. The function returns either a success or an error, and the caller cannot read the value without checking which
- That is the same idea as Zod's `safeParse`, generalized to any function
- The related problem is branching. A chain of `if` statements on a status field compiles fine when a new status is added, and silently does nothing for it
- **Pattern matching** checks the cases against the type, so an unhandled one is a compile error

```ts
import { match, P } from "ts-pattern"

const label = match(order)
  .with({ status: "pending" }, () => "Waiting for payment")
  .with({ status: "paid" }, () => "Awaiting dispatch")
  .with({ status: "shipped", awb: P.string }, (o) => `In transit ${o.awb}`)
  .exhaustive()
```

- `.exhaustive()` is the whole point. Add `"cancelled"` to the union and this stops compiling until it is handled
- `ts-pattern` 5.9.0, `neverthrow` 8.2.0
- Neither is required to write correct code. Both make a class of mistake impossible rather than unlikely
