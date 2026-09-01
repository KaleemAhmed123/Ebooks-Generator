## Object mode

- By default streams carry `Buffer` chunks
- In object mode each chunk is any JavaScript value

```js
import { Transform } from "node:stream"

const toOrder = new Transform({
  objectMode: true,
  transform(line, encoding, callback) {
    const [id, total] = line.split(",")
    callback(null, { id, total: Number(total) })
  },
})
```

- The high water mark becomes a **count of objects**, 16 by default, not 64KB

### Where it earns its place

- Reading a large CSV row by row and writing to a database
- Streaming database results out as JSON without buffering the whole result set

```js
await pipeline(
  db.orders.findMany().stream(),   // objects
  async function* (rows) {
    for await (const row of rows) yield JSON.stringify(row) + "\n"
  },
  res                              // back to bytes
)
```

- Notice the last transform converts objects back to strings
- A byte stream at the end of the chain will throw if you hand it an object
