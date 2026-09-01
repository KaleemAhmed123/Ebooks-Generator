## `pipe` vs `pipeline`

```js
// the old way
readable.pipe(gzip).pipe(writable)

// the way to write it now
import { pipeline } from "node:stream/promises"
await pipeline(readable, gzip, writable)
```

### Why `pipe` is a trap

- It handles backpressure correctly
- It does **not** propagate errors
- If `gzip` fails, `readable` and `writable` are left open and leak

```js
readable.pipe(writable)
readable.on("error", cleanup)   // you have to wire every one
writable.on("error", cleanup)
gzip.on("error", cleanup)
```

### What `pipeline` adds

- One error surfaces as one rejected promise
- Every stream in the chain is destroyed, so nothing leaks
- The promise resolves when the last stream has actually finished

```js
try {
  await pipeline(createReadStream(src), createGzip(), createWriteStream(dst))
} catch (err) {
  // src, gzip and dst are all already closed
}
```

- There is no reason to use `pipe` in new code
