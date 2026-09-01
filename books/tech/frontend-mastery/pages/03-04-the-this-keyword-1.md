## The `this` Keyword

In many programming languages, `this` refers to the class that the method belongs to. It is static and predictable. In JavaScript, `this` is incredibly dynamic, which causes endless confusion for beginners.

**The Golden Rule of `this`:**
The value of `this` does *not* depend on where the function was defined. It depends entirely on **how the function is called.**

### 1. Default Binding (Global)
If you call a standard function by itself, `this` defaults to the Global Object (`window` in the browser). In Strict Mode (`"use strict"`), `this` will instead be `undefined` to prevent you from accidentally modifying the global scope.

```js
function showThis() {
  console.log(this);
}
showThis(); // Window (or undefined in strict mode)
```

### 2. Implicit Binding (Object Method)
When a function is called as a method of an object, `this` is bound to the object standing before the dot.

```js
const user = {
  name: "Alice",
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

user.greet(); // Output: "Hello, my name is Alice"
```

**The Danger Zone:**
If you extract that method into a variable and call it without the object, it loses its binding!

```js
const extractedGreet = user.greet;
extractedGreet(); // Output: "Hello, my name is undefined" (Default Binding took over!)
```
