# Module 3 - The event loop

## What the event loop is

- Node runs your JavaScript on **one thread**
- The event loop is what lets one thread handle thousands of connections

### The idea

- Your code starts an operation that will take time, like reading a file
- Node hands that work to libuv and **returns immediately**
- Your thread carries on with other work
- When the operation finishes, its callback is put in a queue
- The event loop picks callbacks off the queue and runs them, one at a time

```js
console.log("first")

setTimeout(() => console.log("third"), 0)

console.log("second")

// first
// second
// third
```

- The timer callback waits until the current script has finished
- Not because of the zero delay, but because the loop cannot run anything while your code is still running

### The consequence to remember

- Nothing is truly parallel in your JavaScript
- A slow function does not slow one request down. It stops every request
