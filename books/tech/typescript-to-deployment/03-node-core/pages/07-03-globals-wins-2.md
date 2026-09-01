### `crypto.randomUUID`, so no `uuid`

```js
import { randomUUID } from "node:crypto"
randomUUID()   // "3f2b1c1e-..."
```

### `fs.glob`, so no `glob` package

```js
import { glob } from "node:fs/promises"

for await (const file of glob("src/**/*.ts")) {
  console.log(file)
}
```
