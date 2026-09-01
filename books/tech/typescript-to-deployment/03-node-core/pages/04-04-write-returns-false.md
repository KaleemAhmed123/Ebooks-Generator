## `write()` returns a boolean, and it matters

```js
const ok = writable.write(chunk)
```

- `true` means the buffer has room. Keep going
- `false` means the buffer is over its high water mark. Stop and wait for `drain`

### Handling it by hand

```js
readable.on("data", (chunk) => {
  const ok = writable.write(chunk)
  if (!ok) {
    readable.pause()
    writable.once("drain", () => readable.resume())
  }
})
```

- This is what backpressure actually is: pause the source, resume on `drain`
- Ignoring the return value is the single most common Node memory leak

### The version you should write instead

```js
import { pipeline } from "node:stream/promises"

await pipeline(readable, writable)
```

- `pipeline` does the pause and resume for you
- It also destroys every stream in the chain if one fails, which the manual version does not

- The high water mark defaults to 64KB for byte streams and 16 objects in object mode
