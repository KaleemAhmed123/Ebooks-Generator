## Value and reference

- Primitives are copied. Objects are shared

```js
let a = 1
let b = a
b = 2
a            // 1, untouched

let x = { total: 1 }
let y = x
y.total = 2
x.total      // 2, same object
```

- `y = x` copied the reference, not the object

### Where it bites

```js
function applyDiscount(order) {
  order.total = order.total * 0.9
  return order
}

const original = { total: 500 }
const discounted = applyDiscount(original)

original.total     // 450, the original was changed
```

- The function mutated the caller's object

### Copying properly

```js
const copy = { ...order }                    // shallow
const deep = structuredClone(order)          // deep, built in
```

- A spread copies one level. Nested objects are still shared
- `structuredClone` is a global in Node and handles nesting, Maps, Sets and Dates
- It does not copy functions. It throws on them
