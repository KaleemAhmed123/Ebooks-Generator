## `var`, `let` and `const`

| | scope | redeclare | reassign | hoisted as |
|---|---|---|---|---|
| `var` | function | yes | yes | `undefined` |
| `let` | block | no | yes | unreachable |
| `const` | block | no | no | unreachable |

```js
function scopes() {
  if (true) {
    var a = 1
    let b = 2
  }
  console.log(a)   // 1
  console.log(b)   // ReferenceError: b is not defined
}
```

- `var` ignores the block and belongs to the whole function
- `let` and `const` stop at the closing brace

### `const` does not freeze the value

```js
const seller = { name: "kaleem" }
seller.name = "rabiya"     // fine, the object is mutable
seller = {}                // TypeError: Assignment to constant variable
```

- `const` locks the binding, not the contents
- Use `Object.freeze` if you actually need the object immutable

### The rule

- `const` by default. `let` when it has to change. `var` never in new code
