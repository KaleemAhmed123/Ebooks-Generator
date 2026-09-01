### 3. Arrow Functions (The Exception)
Arrow functions completely ignore the golden rule. They do not have their own `this`. Instead, they inherit `this` from the parent scope at the time they were *defined*. This is called Lexical Scoping.

```js
const user = {
  name: "Bob",
  greet: () => {
    // Arrow function looks up to the global scope
    console.log(`Hello, my name is ${this.name}`);
  }
};

user.greet(); // Output: "Hello, my name is undefined"
```

This is why arrow functions are heavily used as callbacks in React classes and standard event listeners: they prevent `this` from accidentally getting rebound to the `window` or the button element.
