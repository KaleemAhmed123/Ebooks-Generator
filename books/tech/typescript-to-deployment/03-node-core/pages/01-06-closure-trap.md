## The closure trap

- Every interview asks some version of this

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// 3, 3, 3
```

- `var` is function scoped, so there is only **one** `i`
- All three callbacks close over that same variable
- By the time they run, the loop has finished and `i` is 3

### The fix

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// 0, 1, 2
```

- `let` creates a **new binding for each iteration**
- Each callback closes over its own copy

### The older fix, before `let`

```js
for (var i = 0; i < 3; i++) {
  ;(function (j) {
    setTimeout(() => console.log(j), 0)
  })(i)
}
```

- The wrapper is an IIFE, which is the next page
