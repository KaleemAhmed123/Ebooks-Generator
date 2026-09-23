## Mapped Types and Conditional Types

Once you master Generics and Utility types (`Partial`, `Pick`), you are a solid intermediate TypeScript developer. To reach the Senior level, you must understand how to programmatically generate types based on other types using **Mapped Types** and **Conditional Types**.

### Mapped Types
A Mapped Type allows you to iterate over the keys of an existing type and create a brand new type. It is essentially a `for...in` loop for the TypeScript compiler.

Imagine you have a `User` type, and you want to create a `UserPermissions` type that has the exact same keys, but every value is a boolean (true if they can edit it, false if they can't).

```typescript
type User = {
  id: string;
  name: string;
  age: number;
};

// 1. We iterate over every key 'K' in the 'User' type using 'in keyof'
// 2. We set the value of that key to 'boolean'
type UserPermissions = {
  [K in keyof User]: boolean;
};

/* 
The resulting type is:
{
  id: boolean;
  name: boolean;
  age: boolean;
}
*/
```

This matters because if a developer later adds `email: string` to the `User` type, `UserPermissions` will *automatically* update to require `email: boolean`. You never have to manually sync the two types.
