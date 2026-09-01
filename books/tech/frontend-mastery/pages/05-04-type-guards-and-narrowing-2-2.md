### Custom Type Guard Functions (`is`)
Sometimes the logic to determine a type is very complex, and you want to extract it into a reusable helper function.
If you just return a boolean from that helper function, TypeScript will lose the type narrowing context. You must explicitly tell the compiler that this function acts as a Type Guard using the `is` keyword.

```typescript
type Admin = { role: "admin", accessLevel: number };
type User = { role: "user", email: string };

// BAD: WRONG: TS just sees a function returning a boolean. It won't narrow the type!
function isAdminWrong(person: Admin | User): boolean {
  return person.role === "admin";
}

// GOOD: RIGHT: The 'is Admin' tells the compiler to narrow the type if this returns true.
function isAdminRight(person: Admin | User): person is Admin {
  return person.role === "admin";
}

function login(person: Admin | User) {
  if (isAdminRight(person)) {
    console.log(person.accessLevel); // Fully typed!
  }
}
```
