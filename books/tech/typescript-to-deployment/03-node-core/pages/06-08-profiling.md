## Profiling

### Finding a memory leak

```bash
node --inspect app.js
```

- Open `chrome://inspect`, take a heap snapshot, run traffic, take another
- Compare the two and sort by delta. What grew is what leaked
- Three snapshots is better. Anything present in all three and still growing is real

```js
import v8 from "node:v8"
v8.writeHeapSnapshot("/tmp/heap.heapsnapshot")
```

- Useful from a signal handler so you can capture production without attaching a debugger

### Finding a slow function

```bash
node --cpu-prof --cpu-prof-dir=./prof app.js
```

- Writes a `.cpuprofile` you open in Chrome DevTools
- Look at self time, not total time. Self time is where the CPU actually was

### What to measure first

- Event loop delay, from the previous module. It tells you **whether** you are blocked
- Then a CPU profile, which tells you **where**
- Measuring in the other order wastes an afternoon
