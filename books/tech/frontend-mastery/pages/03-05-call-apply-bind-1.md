## Explicit Binding: `call`, `apply`, and `bind`

If the default `this` binding behaves in a way you don't want, JavaScript gives you three methods to forcefully override it. Every function in JavaScript has access to these three methods.

### 1. `call()`
The `call()` method immediately invokes the function, but it allows you to explicitly pass in the object that should be used as the `this` context for that invocation. Any additional arguments are passed in one by one, separated by commas.

```js
const user1 = { name: "Alice" };
const user2 = { name: "Bob" };

function introduce(greeting, punctuation) {
  console.log(`${greeting}, I am ${this.name}${punctuation}`);
}

// We forcefully attach the 'introduce' function to user1
introduce.call(user1, "Hello", "!"); // Output: "Hello, I am Alice!"

// We forcefully attach it to user2
introduce.call(user2, "Hi", ".");    // Output: "Hi, I am Bob."
```

### 2. `apply()`
`apply()` is entirely identical to `call()`, except for how it handles additional arguments. Instead of passing them separated by commas, you pass them as a single Array.

```js
// The exact same result as above, using an array for the arguments
introduce.apply(user2, ["Hi", "."]); 
```
*Tip:* A common mnemonic is **A**pply = **A**rray, **C**all = **C**omma.
