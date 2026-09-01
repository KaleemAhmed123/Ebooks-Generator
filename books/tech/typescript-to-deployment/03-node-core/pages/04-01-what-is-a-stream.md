# Module 4 - Streams and backpressure

## What a stream is

- A stream processes data **in pieces** instead of all at once
- You never hold the whole thing in memory

```js
import fs from "node:fs/promises"

// loads the entire file into memory
const data = await fs.readFile("orders.csv")
```

- A 2GB file needs 2GB of memory, and Node's heap limit is smaller than that by default
- Ten users doing it at once needs 20GB

```js
import { createReadStream } from "node:fs"

const stream = createReadStream("orders.csv")
stream.on("data", (chunk) => process(chunk))   // 64KB at a time
```

- Constant memory no matter how large the file is

### Where streams already are

- HTTP requests and responses are streams
- `process.stdin` and `process.stdout` are streams
- File reads, sockets, `zlib` compression, crypto ciphers

- You have been using them without noticing. `res.write()` in an HTTP handler is a stream write
