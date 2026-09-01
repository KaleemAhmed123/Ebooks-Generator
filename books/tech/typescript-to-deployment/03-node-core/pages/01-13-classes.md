## Classes are prototypes underneath

- `class` was added in ES2015. It changed the syntax, not the model

```js
class Order {
  constructor(id) {
    this.id = id
  }

  cancel() {
    return `${this.id} cancelled`
  }
}

class Refund extends Order {
  approve() {
    return `${this.id} refunded`
  }
}
```

- This compiles to the same prototype chain as the previous page

```js
Object.getPrototypeOf(Refund.prototype) === Order.prototype   // true
typeof Order                                                   // "function"
```

### What `class` actually adds

- `extends` and `super` instead of `Object.create` and `.call`
- Methods are non-enumerable, so they do not show up in `for...in`
- The body is always strict mode
- Calling it without `new` throws, which a plain constructor function did not

:::note
**Interview answer.** JavaScript has no classes at runtime. `class` is syntax over prototypes. Every method still lives on the prototype and lookup still walks the chain.
:::
