## The core modules

- Built in. No install. Prefix them with `node:` so nobody can shadow them with a package

```js
import fs from "node:fs/promises"
import path from "node:path"
import crypto from "node:crypto"
```

| Module | What it does |
|---|---|
| `node:fs` | files and directories, callback, sync and promise flavors |
| `node:path` | join and resolve paths without string concatenation |
| `node:os` | cpus, memory, hostname, tmpdir |
| `node:url` | parse and build URLs, `fileURLToPath` |
| `node:crypto` | hashing, HMAC, random bytes, ciphers |
| `node:http` | the server everything else is built on |
| `node:stream` | readable, writable, transform |
| `node:events` | `EventEmitter` |
| `node:util` | `promisify`, `inspect`, `parseArgs` |
| `node:worker_threads` | real threads for CPU work |
| `node:child_process` | run other programs |
| `node:test` | the built in test runner |

### Three flavors of `fs`

```js
import fs from "node:fs"              // callbacks
import fsp from "node:fs/promises"    // promises, use this one
fs.readFileSync("a.txt")              // blocking, startup only
```

- `readFileSync` blocks the event loop. Fine at boot, never inside a request
