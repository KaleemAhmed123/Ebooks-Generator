## Module customization hooks

- Node loads a module by resolving a specifier to a URL, then reading and evaluating the source
- **Customization hooks** let you intervene at both points, which is how a tool changes what Node runs without changing your files
- It is the mechanism behind running TypeScript directly, mapping path aliases, and instrumenting libraries for tracing
- Knowing it exists explains a class of otherwise baffling behavior, where the file on disk is not the code that executed

```js
// hooks.js
export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@app/")) {
    specifier = specifier.replace("@app/", "./src/")
  }
  return next(specifier, context)
}

export async function load(url, context, next) {
  const result = await next(url, context)
  return result
}
```

```js
// register.js, loaded before the app
import { register } from "node:module"
register("./hooks.js", import.meta.url)
```

```bash
node --import ./register.js src/index.ts
```
