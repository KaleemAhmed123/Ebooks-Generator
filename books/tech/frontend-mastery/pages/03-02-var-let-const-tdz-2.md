### `const` does not mean Immutable
A common misconception is that `const` makes a variable immutable. `const` simply prevents **reassignment** of the variable identifier.

```js
const user = { name: "Alice" };
user = { name: "Bob" }; // BAD: TypeError: Assignment to constant variable.

user.name = "Bob"; // GOOD: This works perfectly. The object mutated.
```
If you want to truly freeze an object, you must use `Object.freeze(user)`.
