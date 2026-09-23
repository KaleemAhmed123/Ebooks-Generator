## Type Guards and Narrowing

One of the most common scenarios in TypeScript is dealing with Union Types (e.g., a variable that could be a `String` OR a `Number`).

Before you can call a specific method on that variable (like `.toUpperCase()`), you must prove to the TypeScript compiler that the variable is currently a String, not a Number. This process of proving the type is called **Narrowing**.

### Native Type Guards
TypeScript is incredibly smart. It understands standard JavaScript control flow statements (`if/else`, `typeof`, `instanceof`). 

When you use a native `typeof` check, TypeScript instantly "narrows" the type inside that specific `if` block.

```typescript
function printId(id: number | string) {
  // At this point, TS doesn't know if 'id' is a number or string
  // id.toUpperCase() would throw a compiler error here.

  if (typeof id === "string") {
    // TS narrowed the type. It mathematically guarantees 'id' is a string here.
    console.log(id.toUpperCase());
  } else {
    // Because it wasn't a string, TS logically deduces it MUST be a number here.
    console.log(id.toFixed(2));
  }
}
```
