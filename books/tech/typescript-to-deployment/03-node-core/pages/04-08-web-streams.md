## Node streams vs Web streams

- Node has two stream APIs now

| | Node streams | Web streams |
|---|---|---|
| From | `node:stream` | global, no import |
| Types | Readable, Writable, Duplex, Transform | ReadableStream, WritableStream, TransformStream |
| Composition | `pipeline()` | `pipeThrough()`, `pipeTo()` |
| Runs in | Node only | Node, browsers, Deno, Bun, edge runtimes |

```js
// Web streams
const res = await fetch("https://api.internal/orders")
for await (const chunk of res.body) {
  process(chunk)
}
```

### Converting between them

```js
import { Readable, Writable } from "node:stream"

const nodeStream = Readable.fromWeb(webReadable)
const webStream = Readable.toWeb(nodeReadable)
```

### Which to use

- Talking to `fs`, `http` or `zlib`: Node streams. That is what they give you
- Talking to `fetch`, a `Response` body, or code that must also run outside Node: Web streams
- Convert at the boundary rather than mixing them in the middle of a pipeline
