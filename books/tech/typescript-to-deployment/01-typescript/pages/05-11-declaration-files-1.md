## Declaration files and `@types`

- TypeScript needs to know the shape of code it did not compile: a JavaScript package, a global variable, a JSON import
- A **declaration file**, ending in `.d.ts`, describes those shapes without containing any implementation
- It is types only. Nothing in it survives to runtime, and nothing in it runs
- Modern packages ship their own. Older ones do not, which is why a parallel set of community-written types exists under the `@types` namespace
- The same mechanism lets you extend types you do not own, which is how a property gets added to Express's request object

### Where they come from

- **Bundled** - modern libraries ship their own `.d.ts`. Nothing to install
- **DefinitelyTyped** - the community repo, installed as `@types/<name>`

```bash
npm i express
npm i -D @types/express     # express does not bundle its own
```

- If an import errors with *Could not find a declaration file*, try the `@types` package first
