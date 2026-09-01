## The four types

- Every stream is one of four kinds, and the names describe which direction data moves
- The distinction matters because it decides where a stream can sit in a chain
- A source can only be at the front, a sink can only be at the end, and only a transform can sit in the middle

```js
import { createReadStream, createWriteStream } from "node:fs"
import { createGzip } from "node:zlib"
import { pipeline } from "node:stream/promises"

await pipeline(
  createReadStream("orders.csv"),   // readable
  createGzip(),                     // transform
  createWriteStream("orders.gz")    // writable
)
```

- Three streams, one line, constant memory
- The same job with `readFile` and `writeFile` would hold the whole file twice

### Two reading modes

- **Flowing**, where data is pushed at you through the `data` event
- **Paused**, where you pull with `read()` or a `for await` loop

```js
for await (const chunk of createReadStream("orders.csv")) {
  process(chunk)
}
```

- The `for await` form is the one to reach for. It pauses correctly on its own
