## Async / Await Patterns

While Promises and `.then()` chains were a massive improvement over callbacks, they still required passing functions into functions. The syntax felt disconnected from standard synchronous JavaScript.

In ES8 (2017), JavaScript introduced `async / await`. This is purely "syntactic sugar" built directly on top of Promises. It allows you to write asynchronous code that reads top-to-bottom, exactly like synchronous code.

### The Basics

Any function marked with the `async` keyword automatically returns a Promise. 
Inside an `async` function, you can use the `await` keyword in front of any Promise. The `await` keyword literally pauses the execution of *that specific function* until the Promise resolves.

It does *not* pause the entire JavaScript engine. The browser remains fully responsive and can handle user clicks while the function waits in the background.

```js
// The old way
function getUser() {
  fetch('/api/user')
    .then(res => res.json())
    .then(data => console.log(data));
}

// The modern way
async function getUser() {
  const res = await fetch('/api/user');
  const data = await res.json();
  console.log(data);
}
```
