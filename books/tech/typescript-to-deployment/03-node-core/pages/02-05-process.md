## `process`

- A global object describing the running process. No import needed

```js
process.argv       // ["/path/node", "/path/app.js", "--port", "3000"]
process.env        // environment variables, all strings
process.cwd()      // where the process was started
process.pid        // process id
process.uptime()   // seconds since start
process.memoryUsage()
process.version    // "v24.11.0"
process.platform   // "linux", "win32", "darwin"
```

### Exiting

```js
process.exitCode = 1     // exit with 1 when work finishes
process.exit(1)          // exit right now, kills pending work
```

- Prefer `exitCode`. `process.exit` can cut off a log write mid flush
- `0` means success. Anything else means failure, and that is what Docker and CI read

### Parsing arguments without a library

```js
import { parseArgs } from "node:util"

const { values } = parseArgs({
  options: { port: { type: "string", default: "3000" } },
})

values.port   // "3000"
```

- `parseArgs` is built in and covers most scripts. No `yargs` or `commander` needed
