## Getting the work off the loop

- Four options, in the order you should consider them

### 1. Do not do it in the request

- Write a job row, return 202, let a worker process it
- The right answer for reports, exports, image processing and emails

### 2. Use the async version

```js
import { scrypt } from "node:crypto"
import { promisify } from "node:util"

const hash = promisify(scrypt)
await hash(password, salt, 64)     // runs on the thread pool
```

- Same work, different thread. The loop stays free

### 3. Chunk it and yield

```js
async function sum(rows) {
  let total = 0
  for (let i = 0; i < rows.length; i++) {
    total += rows[i].amount
    if (i % 10_000 === 0) await new Promise(setImmediate)
  }
  return total
}
```

- `await new Promise(setImmediate)` hands control back to the loop
- Other requests get served in between

### 4. A worker thread

- For genuinely CPU bound work that has to finish inline
- Covered in Module 6
