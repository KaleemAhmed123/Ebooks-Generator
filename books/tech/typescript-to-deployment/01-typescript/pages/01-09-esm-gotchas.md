## The three ESM gotchas

### 1. Imports need a file extension

- ESM does not guess extensions the way `require` did
- And you write `.js`, even though the file on disk is `.ts`
  - because you are importing what the **compiler will emit**

```ts
import { start } from "./server.js"   // correct, even from server.ts
import { start } from "./server"      // ERR_MODULE_NOT_FOUND at runtime
import { start } from "./server.ts"   // wrong once compiled
```

### 2. `__dirname` and `__filename` do not exist

- They were CommonJS globals
- ESM gives you `import.meta.url` instead

```ts
import { fileURLToPath } from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
```

### 3. `require` is gone

- Use a dynamic `import()` when you need a module at runtime
- It returns a promise

```ts
const { default: config } = await import("./config.js")
```
