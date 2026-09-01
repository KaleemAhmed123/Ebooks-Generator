### The `never` Type
The `never` type represents a state that logically *should not be able to happen*.

#### 1. Functions that crash or never return
If a function throws an Error, or has an infinite `while(true)` loop, it literally never returns a value to the execution context. Its return type is `never`.
```typescript
function crashMyApp(msg: string): never {
  throw new Error(msg);
}
```

#### 2. Exhaustiveness Checking (The Switch Statement Trick)
The true power of `never` is using it to guarantee that you handled every single case in a `switch` statement.

```typescript
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape) {
  switch (shape) {
    case "circle": return Math.PI;
    case "square": return 100;
    case "triangle": return 50;
    default:
      // If we handled all 3 shapes, the compiler knows 'shape' cannot possibly exist here.
      // Therefore, TS assigns 'shape' the type of 'never'.
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```
**Why this matters.** Six months later someone adds `"hexagon"` to `Shape` and forgets the switch. Now `shape` reaches the `default` block as a `"hexagon"`, and assigning it to a variable typed `never` fails to compile: *`Type "hexagon" is not assignable to type "never"`*. The compiler caught a production bug by proving the switch was no longer exhaustive.
