### Type Aliases
A `type` alias can define objects, just like an interface, but it also covers Primitives, Tuples, and Unions.

```typescript
// Interfaces CANNOT do this:
type Status = "pending" | "shipped" | "delivered";

// If you type "refunded", the TS compiler will immediately throw a fatal error.
const currentStatus: Status = "pending"; 
```

**The Modern Recommendation:** 
For React components, use `type` for everything (like defining your Component Props) unless you specifically need object-oriented inheritance (`extends`) or declaration merging. Types are more versatile and predictable.

## The `any` and `unknown` types

- **`any`:** Turns off TypeScript entirely for that variable. It is a complete escape hatch. You can call `.map()` on an `any` variable, and TS will not stop you. **Using `any` is an anti-pattern. If you use it, you shouldn't be using TypeScript.**
- **`unknown`:** The safe version of `any`. It tells TS "I don't know what this data is yet." Unlike `any`, TS will force you to check the type (using a `typeof` check) before it lets you execute any methods on it. This is the industry standard for catching errors from `try/catch` blocks.
