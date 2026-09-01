### Unpacking an Array
You can use the exact same pattern to figure out what type of items are living inside an Array.

```typescript
// "If T is an Array of 'something', extract that 'something' and call it U"
type FlattenArray<T> = T extends Array<infer U> ? U : T;

type StrArray = string[];
type SingleItem = FlattenArray<StrArray>; // Type is 'string'
```

### The Native Utilities
The `infer` keyword is so powerful that it actually powers almost all of TypeScript's native utility types.

For example, the native `ReturnType<T>` utility (which figures out what type a function returns) is just a single line of code using `infer` under the hood!

```typescript
// This is exactly how TypeScript's native ReturnType is built!
// "If T is a function that returns 'something', extract that 'something' and call it R"
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

Once you master `infer`, you realize that TypeScript is essentially a fully Turing-complete functional programming language that runs entirely inside the compiler before your code even executes.
