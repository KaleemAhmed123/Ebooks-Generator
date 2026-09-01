## Blocking the event loop

- One slow synchronous function stops **every** request, not just its own

```js
app.get("/report", (req, res) => {
  let total = 0
  for (let i = 0; i < 5_000_000_000; i++) total += i   // 20 seconds
  res.json({ total })
})
```

- For those 20 seconds the server answers nothing. Health checks fail and the orchestrator restarts it

### The usual culprits

- `JSON.parse` on a very large payload
- `readFileSync` or `execSync` inside a handler
- A regular expression that backtracks, known as ReDoS
- Sorting or mapping an array with hundreds of thousands of items
- Synchronous crypto such as `pbkdf2Sync`
- `bcrypt.hashSync`

### Spotting it

```js
import { monitorEventLoopDelay } from "node:perf_hooks"

const h = monitorEventLoopDelay({ resolution: 20 })
h.enable()

setInterval(() => {
  console.log("loop delay p99 ms", h.percentile(99) / 1e6)
  h.reset()
}, 5000)
```

- Healthy is single digit milliseconds
- Anything consistently above about 100ms means requests are already queueing behind something
