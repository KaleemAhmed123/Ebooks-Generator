## Execution Context - continued

```js
const name = "Global";

function first() {
  const name = "First";
  second();
}

function second() {
  const name = "Second";
  console.log(name);
}

first();
```
*In the code above, the Call Stack looks like this at the moment `console.log` is called:*
1. `second()` Execution Context
2. `first()` Execution Context
3. Global Execution Context

## Hoisting

Because of the "Creation Phase," JavaScript already knows about your variables and functions before it even starts executing line 1. This behavior is called **Hoisting**.

### Function Hoisting
Function declarations are fully hoisted. The engine stores the entire function in memory during the creation phase.

```js
sayHello(); // Output: "Hello World"

function sayHello() {
  console.log("Hello World");
}
```
