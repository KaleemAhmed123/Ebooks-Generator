## ESM vs CommonJS

- Node has two module systems and you must pick one per package
- **CommonJS (CJS)** is the old one - `require` and `module.exports`
- **ES Modules (ESM)** is the standard one. `import` and `export`

```js
// CommonJS
const express = require("express")
module.exports = { start }

// ES Modules
import express from "express"
export { start }
```

### How Node decides which one a file is

- `"type": "module"` in `package.json` → every `.js` file is ESM
- No `"type"` field, or `"type": "commonjs"` → every `.js` file is CJS
- A `.mjs` file is always ESM
- A `.cjs` file is always CJS

### Which to choose for a new service

- **ESM.** It is the standard, and every serious library now ships it
- Set `"type": "module"` in `package.json`
- Set `"module": "nodenext"` and `"moduleResolution": "nodenext"` in `tsconfig.json`
