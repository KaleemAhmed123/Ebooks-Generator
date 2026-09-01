## Closures & Lexical Scope

One of the hardest concepts for beginners to grasp, yet the most essential for modern React, is the **Closure**.

### Lexical Scoping
JavaScript uses lexical scoping. This means the engine determines the scope of a variable based on where it was physically written in the source code, not where it is called from. 

When a function looks for a variable, it looks inside its own local scope. If it cannot find it, it steps out to the parent scope, and so on, until it hits the global scope.

### What is a Closure?
When a function finishes running, its Execution Context is popped off the Call Stack, and its local memory is usually destroyed by the Garbage Collector. 

However, if that function returns *another* function, something special happens. The inner function maintains a "backpack" of the exact variables it needs from its parent's scope. It remembers the environment in which it was created. **This memory is a Closure.**

```js
function createCounter() {
  let count = 0; // This variable lives in createCounter's scope

  // We return an inner function that accesses 'count'
  return function increment() {
    count++;
    console.log(`Count is now: ${count}`);
  }
}

// createCounter finishes running completely.
const myCounter = createCounter(); 

// Yet, myCounter still remembers the 'count' variable!
myCounter(); // Count is now: 1
myCounter(); // Count is now: 2
```
