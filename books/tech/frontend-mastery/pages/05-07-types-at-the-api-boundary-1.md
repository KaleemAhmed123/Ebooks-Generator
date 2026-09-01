## Types at the API Boundary

Everything in this module so far describes types inside your own code, where the
compiler can see everything and is therefore always right.

The API boundary is where that stops. `await res.json()` returns `any`. The
compiler has no idea what came back over the wire and will not stop you doing
anything with it. This one line is where most production type errors are born:
the code compiles, the types are a lie, and the crash arrives at runtime.

This page is about closing that gap, and it is the part of TypeScript that
senior job descriptions mean when they say "advanced TypeScript".

### The lie

```ts
interface User { id: string; name: string; age: number }

const res = await fetch('/api/user/1');
const user: User = await res.json();   // a promise, not a check

console.log(user.age.toFixed(2));      // compiles. crashes if age is a string.
```

`res.json()` is `Promise<any>`, and `any` assigns to anything. The annotation
tells the compiler to stop asking questions. Nothing verified anything.
