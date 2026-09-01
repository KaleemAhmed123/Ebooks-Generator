### The starvation trap

```js
function loop() { process.nextTick(loop) }
loop()   // the event loop never advances again
```

- A `nextTick` that queues another `nextTick` never lets the loop breathe. No timer, no IO, nothing
