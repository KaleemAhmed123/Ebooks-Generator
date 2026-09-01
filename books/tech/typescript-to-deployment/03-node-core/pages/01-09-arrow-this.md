## Arrow functions and `this`

- An arrow function has **no `this` of its own**
- It uses the `this` from where it was written, and that never changes

```js
const shop = {
  name: "kaleem",
  regular() { return this.name },
  arrow: () => this.name,
}

shop.regular()   // "kaleem"
shop.arrow()     // undefined
```

- `arrow` was written at the top level, so its `this` is the module scope, not `shop`

### Where that is exactly what you want

```js
class OrderSync {
  name = "sync"

  run = () => {
    console.log(this.name)
  }
}

const job = new OrderSync()
const fn = job.run
fn()   // "sync", still correct
```

- Passing `job.run` as a callback would break a normal method
- The arrow captured `this` when the field was created, so it survives

### The rule

- Object methods: normal function
- Callbacks and class fields passed around: arrow
