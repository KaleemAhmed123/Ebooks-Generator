### Utility Types

TypeScript comes with built-in utility functions that transform existing types. You should memorize these, as they are used constantly in enterprise codebases.

#### 1. `Partial<T>`
Takes a type and makes all of its properties optional. This is perfect for database update functions, where the user might only be updating their `name`, but not their `age` or `id`.

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

// UserUpdate is exactly like User, but everything has a `?`
type UserUpdate = Partial<User>; 

const payload: UserUpdate = { name: "Bob" }; // Perfectly valid!
```

#### 2. `Pick<T, Keys>`
Creates a brand new type by selecting a specific subset of properties from an existing type.

```typescript
// We only want the name and email, we don't want the ID to be exposed to the public
type PublicProfile = Pick<User, "name" | "email">;
```

#### 3. `Omit<T, Keys>`
The exact opposite of `Pick`. It creates a new type by taking an existing type and explicitly deleting specific properties.

```typescript
// We take the full User object, but delete the password field for security
type SafeUser = Omit<User, "passwordHash">;
```

By mastering Generics and Utility Types, you transition from "writing types to make the red squiggles go away" to "engineering a type-safe architecture."
