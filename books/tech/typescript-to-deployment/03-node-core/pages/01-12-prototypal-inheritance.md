## Prototypal inheritance

```js
function Order(id) {
  this.id = id
}

Order.prototype.cancel = function () {
  return `${this.id} cancelled`
}

const order = new Order("o1")
order.cancel()   // "o1 cancelled"
```

- `cancel` lives on `Order.prototype`, not on `order`
- One thousand orders share one function instead of holding a copy each

### Linking two levels

```js
function Refund(id) {
  Order.call(this, id)
}

Refund.prototype = Object.create(Order.prototype)
Refund.prototype.constructor = Refund

Refund.prototype.approve = function () {
  return `${this.id} refunded`
}

const r = new Refund("o2")
r.approve()   // "o2 refunded"
r.cancel()    // "o2 cancelled", inherited
```

- `Order.call(this, id)` runs the parent constructor against the new object
- `Object.create(Order.prototype)` links the chain
- Resetting `constructor` keeps `r.constructor` pointing at `Refund`
