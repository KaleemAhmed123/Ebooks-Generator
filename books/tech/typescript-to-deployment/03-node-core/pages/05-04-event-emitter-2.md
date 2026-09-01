### The two things that go wrong

**An `error` event with no listener crashes the process**

```js
queue.on("error", (err) => log(err))   // always add this
```

- It is the one event name Node treats specially

**Listener leaks**

```
MaxListenersExceededWarning: 11 order listeners added
```

- A warning, not an error, and it usually means you add a listener per request and never remove it
- `emitter.off(name, fn)` removes one. `once` removes itself

### Waiting for an event as a promise

```js
import { once } from "node:events"

const [order] = await once(queue, "order")
```
