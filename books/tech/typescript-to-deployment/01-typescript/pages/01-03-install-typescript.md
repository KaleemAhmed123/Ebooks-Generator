## Install TypeScript

- TypeScript ships as a normal npm package
- Install it into the project, never globally
  - the version then belongs to the repo, not to your laptop

```bash
npm install --save-dev typescript

npx tsc --version   // Version 7.0.2
```

### Your first file

- Create `hello.ts`
- `name: string` is a **parameter annotation**
- The `: string` after the brackets is the **return type**

```ts
function greet(name: string): string {
  return `hello ${name}`
}

console.log(greet("rabiya"))   // hello rabiya
```

- Change `greet(42)` and the compiler stops you before you ever run it
