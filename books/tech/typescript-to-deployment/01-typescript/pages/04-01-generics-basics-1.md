# Module 4 - Generics and utility types

## Generics

- A function that takes an array of orders and returns the first one is easy to type
- Writing the same function again for sellers, then for shipments, is the same code three times with one word changed
- Typing it once as `any[]` works and throws away everything. The caller gets back `any` and the compiler stops helping
- A **generic** is a type the caller fills in. The function says the input and output share a type without naming which one
- The name comes from writing code that is generic over a type rather than fixed to one
- The compiler infers it from the argument, so the caller usually writes nothing at all
- This is the same idea as a function parameter, one level up. A parameter varies the value, a type parameter varies the type

```ts
// the any version - works, but loses the type
function firstAny(items: any[]): any {
  return items[0]
}

const a = firstAny(["x"])   // any. No help from here on
```
