### The shorter modern form

```js
import { Readable } from "node:stream"

await pipeline(
  createReadStream("orders.csv"),
  async function* (source) {
    for await (const chunk of source) {
      yield chunk.toString().toUpperCase()
    }
  },
  createWriteStream("upper.csv")
)
```

- An async generator can sit anywhere in a pipeline
- No class, no callback. Usually the readable option

:::note
Chunk boundaries are arbitrary. A line, a JSON object or a multi-byte character can be split across two chunks. If your transform is line based, buffer the remainder yourself or use `readline`.
:::
