### What crosses the boundary

- Messages are **structured cloned**, so they are copied, not shared
- Functions and class instances do not survive the copy
- A large payload costs real time to clone

### Sharing without copying

```js
const shared = new SharedArrayBuffer(1024)
```

- Genuinely shared memory, and genuinely a source of race conditions
- Reach for it only when profiling proves cloning is the bottleneck

### The cost

- A worker takes tens of milliseconds to start and a few megabytes of memory
- Creating one per request is slower than doing the work inline. Pool them
