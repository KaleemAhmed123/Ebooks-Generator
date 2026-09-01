## Typing what can be thrown

- TypeScript has **no** checked exceptions
- A function signature never tells you what it might throw

```ts
function load(id: string): User {
  throw new NotFoundError(id)     // signature still says it returns User
}
```

### A caught error is `unknown`

```ts
try {
  await run()
} catch (err) {
  err.message     // 'err' is of type 'unknown'
}
```

- This is correct. JavaScript lets you throw anything at all

```js
throw "a string"
throw 42
throw undefined
```
