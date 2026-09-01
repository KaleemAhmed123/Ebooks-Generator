## The `never` and `unknown` Types

JavaScript developers are used to `null` and `undefined`. When transitioning to TypeScript, they often misunderstand its two unique types: `never` and `unknown`.

### The `unknown` Type (The Safe `any`)
Using the `any` type completely disables the TypeScript compiler. It is a virus. If you use `any`, you can call `.toLowerCase()` on a Number, and the compiler will stay silent, causing a catastrophic runtime crash in production.

Instead, if you are fetching data from an API and you truly have *no idea* what the data looks like, you should use `unknown`.

The `unknown` type forces you to manually prove to the compiler what the type is before it allows you to do anything with it.

```typescript
let data: unknown;

// BAD: COMPILER ERROR: "Object is of type 'unknown'"
data.toLowerCase(); 

// GOOD: You must prove it using a Type Guard first!
if (typeof data === "string") {
  console.log(data.toLowerCase()); // Now it works perfectly
}
```
