## EventEmitter

- Sometimes one part of a program needs to tell several others that something happened, without knowing who they are
- Calling each one directly means the caller holds a list of every listener, and adding a fifth means editing code that had nothing to do with the change
- **Publish and subscribe** inverts that. The producer announces an event by name, and anyone interested registers for that name
- The producer never learns who listened, which is what lets a feature be added without touching it
- `EventEmitter` is Node's built-in implementation, and half the standard library extends it
- A readable stream, an HTTP server and a child process are all emitters, which is why `.on()` appears everywhere in Node
- Two things about it surprise people. `emit` is **synchronous**, so every listener runs before `emit` returns
- And an `error` event with no listener crashes the process, which is the one event name Node treats specially

```js
import { EventEmitter } from "node:events"

class OrderQueue extends EventEmitter {
  push(order) {
    this.emit("order", order)
  }
}

const queue = new OrderQueue()

queue.on("order", (order) => console.log("received", order.id))
queue.once("order", (order) => console.log("only the first"))

queue.push({ id: "o1" })
```

- `on` listens every time, `once` listens one time
- `emit` is **synchronous**. Every listener runs before `emit` returns
