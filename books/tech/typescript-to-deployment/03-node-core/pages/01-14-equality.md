## Equality and truthiness

### `==` coerces, `===` does not

```js
1 == "1"        // true
1 === "1"       // false

null == undefined    // true
null === undefined   // false

0 == ""         // true
[] == false     // true
```

- `==` converts types before comparing, and the rules are not worth memorizing
- Use `===` everywhere. The one exception is `x == null`, which checks both `null` and `undefined` in one go

### The eight falsy values

```js
false, 0, -0, 0n, "", null, undefined, NaN
```

- Everything else is truthy, including `[]`, `{}` and `"0"`

### Where this bites on a server

```js
if (!order.quantity) {
  throw new Error("quantity required")
}
```

- A quantity of `0` is a real value and this rejects it
- Check what you actually mean

```js
if (order.quantity === undefined) { ... }
if (order.quantity == null) { ... }        // null or undefined
```

- Same trap with `""` for an empty note and `false` for a boolean flag
