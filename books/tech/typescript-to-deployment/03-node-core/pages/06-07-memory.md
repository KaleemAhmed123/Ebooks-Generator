## Memory and garbage collection

- V8 splits the heap in two

**New space**, small and collected constantly. Most objects die here, and that is cheap
**Old space**, for objects that survived. Collected rarely and expensively

```js
process.memoryUsage()
// {
//   rss: 62_349_312,        total memory held by the process
//   heapTotal: 35_000_320,  heap V8 has reserved
//   heapUsed: 28_113_920,   heap actually in use
//   external: 1_083_684     C++ objects, Buffers
// }
```

- `heapUsed` climbing and never falling is the signal for a leak
- `rss` includes Buffers, which live outside the heap

### The heap limit

- Around 4GB on 64-bit by default. It is not your machine's memory

```bash
node --max-old-space-size=2048 app.js
```

- In a container, set it **below** the container limit
- Otherwise V8 keeps allocating, the kernel OOM-kills the process, and you get exit code 137 with no stack trace

### Where leaks actually come from

- A `Map` or array used as a cache with no eviction
- Listeners added per request and never removed
- Closures holding a large object alive from inside a long-lived timer
- Globals, including the `globalThis` singleton trick used outside development
