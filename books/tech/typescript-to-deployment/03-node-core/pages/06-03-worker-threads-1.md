## `worker_threads`

- A child process is a whole second Node runtime. Starting one costs tens of milliseconds and its own memory
- That is heavy when all you wanted was to run one slow function off the main thread
- A **worker thread** is a thread inside the same process, with its own V8 instance and its own event loop
- It is cheaper than a process, and it can share raw memory with the parent, which a process cannot
- What it is not is free. Values passed between threads are **copied** using structured cloning, not shared
- So a worker earns its place when the work is CPU heavy and the data crossing the boundary is small
- Hand it a large array and the copy can cost more than the calculation you moved

```js
// main.js
import { Worker } from "node:worker_threads"

function runTotal(rows) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./total.js", { workerData: rows })
    worker.on("message", resolve)
    worker.on("error", reject)
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error(`exited ${code}`))
    })
  })
}
```

```js
// total.js
import { workerData, parentPort } from "node:worker_threads"

const total = workerData.reduce((sum, row) => sum + row.amount, 0)
parentPort.postMessage(total)
```

- The main event loop stays free the entire time
