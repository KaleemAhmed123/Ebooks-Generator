## Typing `this`

- In JavaScript, `this` depends on **how a function is called**, not where it is written
- With `noImplicitThis` on, TypeScript makes you say what it should be

### The `this` parameter

- A first parameter literally named `this` is a type annotation, not a real argument

```ts
interface Handler {
  name: string
  run(this: Handler): void
}

const h: Handler = {
  name: "sync",
  run() { console.log(this.name) },
}

h.run()             // sync
const fn = h.run
fn()                // 'this' context of type 'void' is not assignable
```

- The last line is the classic bug, caught at build time instead of production

### Arrow functions do not have their own `this`

```ts
class Job {
  name = "sync"
  run = () => console.log(this.name)   // safe to pass around
}
```

- An arrow function captures `this` from where it was **defined**
- That is why class fields are written as arrows when they get passed as callbacks
