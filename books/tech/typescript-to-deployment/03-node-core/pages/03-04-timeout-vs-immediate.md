## `setTimeout` vs `setImmediate` vs `nextTick`

| | Runs in | Priority |
|---|---|---|
| `process.nextTick` | before the loop continues | highest |
| promise callbacks | after nextTick, still before the loop continues | high |
| `setImmediate` | check phase | after poll |
| `setTimeout(fn, 0)` | timers phase | next turn |

### At the top level the order is not guaranteed

```js
setTimeout(() => console.log("timeout"), 0)
setImmediate(() => console.log("immediate"))

// order varies between runs
```

- `setTimeout(fn, 0)` is really 1ms. Whether that millisecond has passed when the loop starts depends on machine load

### Inside an IO callback it is guaranteed

```js
import fs from "node:fs"

fs.readFile("a.txt", () => {
  setTimeout(() => console.log("timeout"), 0)
  setImmediate(() => console.log("immediate"))
})

// immediate
// timeout
```

- The callback runs in the poll phase, and **check** comes straight after poll
- Timers only get another look on the next turn

### Which to reach for

- `setImmediate` to yield after IO
- `setTimeout` when you genuinely mean a delay
- `process.nextTick` almost never. It is for library authors deferring inside an API
