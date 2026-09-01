## `var` vs `let` vs `const`: The Temporal Dead Zone

To fix the unpredictable nature of `var` and hoisting, ES6 introduced `let` and `const`. 

### Block Scoping
`var` is **function-scoped**. This means if you declare a `var` inside an `if` block or a `for` loop, it leaks out and affects the entire function.

```js
function testScope() {
  if (true) {
    var leakingVariable = "I am free!";
    let secureVariable = "I am trapped!";
  }
  
  console.log(leakingVariable); // Output: "I am free!"
  console.log(secureVariable);  // ReferenceError: secureVariable is not defined
}
```

`let` and `const` are **block-scoped**. They exist only within the nearest set of curly braces `{}`. This makes code much more predictable.

### The Temporal Dead Zone (TDZ)
Are `let` and `const` hoisted? **Yes**. But unlike `var`, the JavaScript engine does not initialize them with `undefined`. 

Instead, they are placed into a state called the **Temporal Dead Zone (TDZ)**. From the start of the block until the exact line where the variable is declared, the variable exists in the TDZ. If you try to access it while it is in the TDZ, the engine aggressively throws a `ReferenceError`.

```js
console.log(myVar); // Output: undefined
var myVar = 10;

console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 10;
```

This is a massive improvement. Failing loudly and early is always better than silently returning `undefined` and causing a NaN bug 100 lines later.
