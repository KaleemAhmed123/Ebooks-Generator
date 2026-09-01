### The `in` Operator (Narrowing Objects)
If you have a Union of two complex objects, `typeof` won't help (it just returns `"object"` for both). You can use the `in` operator to check if a specific property exists on the object.

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // TS knows it's a Fish
  } else {
    animal.fly(); // TS knows it's a Bird
  }
}
```
