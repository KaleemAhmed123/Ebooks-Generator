## Microtasks and macrotasks

- Two queues with different priority

**Microtasks**, drained completely before the loop moves on
- `process.nextTick`
- promise callbacks, which means every `await`
- `queueMicrotask`

**Macrotasks**, one per phase visit
- `setTimeout`, `setInterval`
- `setImmediate`
- IO callbacks

```js
console.log("1 sync")

setTimeout(() => console.log("5 timeout"), 0)
setImmediate(() => console.log("6 immediate"))

Promise.resolve().then(() => console.log("4 promise"))
process.nextTick(() => console.log("3 nextTick"))

console.log("2 sync")
```

```
1 sync
2 sync
3 nextTick
4 promise
5 timeout
6 immediate
```

- All synchronous code runs first
- Then `nextTick`, which outranks even promises
- Then promises
- Only then does the loop advance to a phase
