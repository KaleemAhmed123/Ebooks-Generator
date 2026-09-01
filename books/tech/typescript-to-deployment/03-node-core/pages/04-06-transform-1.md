## Writing a Transform stream

- Takes chunks in, pushes chunks out

```js
import { Transform } from "node:stream"

const redactEmails = new Transform({
  transform(chunk, encoding, callback) {
    const cleaned = chunk.toString().replace(/[\w.]+@[\w.]+/g, "[redacted]")
    callback(null, cleaned)
  },
})

await pipeline(
  createReadStream("orders.csv"),
  redactEmails,
  createWriteStream("safe.csv")
)
```

- `callback(null, output)` pushes a chunk downstream
- `callback(err)` fails the whole pipeline
