# Module 5 - Async patterns and errors

## Callbacks

- The original async style. Node's own convention is **error first**

```js
import fs from "node:fs"

fs.readFile("orders.csv", (err, data) => {
  if (err) return console.error(err)
  console.log(data.length)
})
```

- The first argument is the error, or `null`
- Returning early on the error keeps the happy path unindented
