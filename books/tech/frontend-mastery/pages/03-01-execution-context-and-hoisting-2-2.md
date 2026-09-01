### Variable Hoisting (`var`)
Variables declared with `var` are partially hoisted. The engine allocates memory for the variable, but it initializes it with `undefined`. It does not hoist the *assignment*.

```js
console.log(age); // Output: undefined
var age = 25;
console.log(age); // Output: 25
```

This is one of the most common causes of bugs in legacy JavaScript, leading to the creation of `let` and `const`.
