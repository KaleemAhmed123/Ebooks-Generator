# Module 7 - Recent Node wins most people missed

## Four dependencies you can delete

### `nodemon`

```bash
node --watch app.js
node --watch-path=./src app.js
```

### `dotenv`

```bash
node --env-file=.env app.js
node --env-file-if-exists=.env.local --env-file=.env app.js
```

- Later files win, so this gives you layered config with no library

### `npm run`

```bash
node --run dev
```

- Runs a `package.json` script without spawning npm first. Noticeably faster in CI

### `yargs` and `commander`

```js
import { parseArgs } from "node:util"

const { values, positionals } = parseArgs({
  options: {
    port: { type: "string", short: "p", default: "3000" },
    verbose: { type: "boolean", default: false },
  },
  allowPositionals: true,
})
```

- Covers flags, shorts, defaults and positionals. Enough for almost every internal script
