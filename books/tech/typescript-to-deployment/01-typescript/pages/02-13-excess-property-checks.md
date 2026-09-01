## Excess property checks

- Structural typing allows extra properties
- But there is one exception, and it surprises everybody

```ts
interface Point { x: number; y: number }

// allowed - assigned through a variable
const thing = { x: 1, y: 2, color: "red" }
const a: Point = thing

// rejected - object literal assigned directly
const b: Point = { x: 1, y: 2, color: "red" }
// 'color' does not exist in type 'Point'
```

### Why the difference

- When you write an object **literal** directly into a typed slot, TypeScript assumes you meant every key
- An extra key is almost always a typo, so it flags it
- Once the object has been through a variable, that assumption no longer holds

### How to deal with it

- Usually: **fix the typo.** The check is right
- If the extra key is intentional, widen the type or assign through a variable
- Never reach for `as Point` - that switches the check off and keeps the bug
