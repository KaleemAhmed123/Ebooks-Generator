### Interface
An `interface` is strictly for defining the shape of an Object or a Class. If you come from an Object-Oriented Programming (OOP) background like Java or C#, you will feel right at home.

```typescript
interface UserProfile {
  id: string;
  name: string;
  age?: number; // The ? means this property is optional
}

const user: UserProfile = {
  id: "u_123",
  name: "Alice"
  // We omitted 'age', and TS is perfectly fine with that.
};
```

One unique feature of interfaces is **Declaration Merging**. If you declare two interfaces with the exact same name, TypeScript will silently merge them into one massive interface. This is heavily used by library authors (like React or Express) so you can extend their global types.
