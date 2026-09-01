### Conditional Types
Conditional Types allow you to apply `if/else` logic to your types using the ternary operator `? :`.

```typescript
// If T extends String, return "Text", else return "Number"
type IsString<T> = T extends string ? "Text" : "Number";

type A = IsString<string>; // Type is "Text"
type B = IsString<number>; // Type is "Number"
```

#### Combining them for API Responses
You can combine these features to build heavily typed API wrappers. 

```typescript
type APIResponse<T> = T extends null | undefined
  ? { status: "error"; message: string }
  : { status: "success"; data: T };

// The compiler knows exactly what shape this object must take
const response: APIResponse<User> = {
  status: "success",
  data: { id: "1", name: "Alice", age: 30 }
};
```
By mastering Mapped and Conditional types, you can build architectural libraries and internal toolkits that provide flawless auto-complete for the rest of your engineering team.
