## `call`, `apply` and `bind`

- Three ways to set `this` yourself

```js
function describe(currency, suffix) {
  return `${this.name} ${currency}${suffix}`
}

const seller = { name: "kaleem" }

describe.call(seller, "INR", " 500")    // args listed
describe.apply(seller, ["INR", " 500"]) // args in an array
const bound = describe.bind(seller)     // returns a new function
bound("INR", " 500")
```

| | calls now | arguments |
|---|---|---|
| `call` | yes | one by one |
| `apply` | yes | as an array |
| `bind` | no | returns a bound copy |

- `call` and `apply` differ only in how arguments are passed
- `bind` does not call anything. It hands back a new function with `this` fixed

### Partial application

```js
const inRupees = describe.bind(seller, "INR")
inRupees(" 500")   // "kaleem INR 500"
```

- Arguments passed to `bind` are locked in too
- A bound function cannot be re-bound. The first `bind` wins
