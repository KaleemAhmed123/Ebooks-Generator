## Recap of Module 3

:::interview
What is the difference between `any`, `unknown` and `never`?

- **`any`** switches type checking off for that value. Anything is allowed, nothing is checked, and it spreads to everything it touches
- **`unknown`** also accepts any value, but permits **no operations** until you narrow it. It is the safe version of `any`
- **`never`** is the type with **no possible values**. It is what a function that always throws returns, and what is left after every union member has been narrowed away
:::

### Where each one belongs

- `unknown` - request bodies, `JSON.parse` results, caught errors
- `never` - the `default` branch of an exhaustive `switch`
- `any` - while migrating old JavaScript, and nowhere else

```ts
try {
  await run()
} catch (err) {          // unknown, with useUnknownInCatchVariables
  if (err instanceof Error) log(err.message)
  else log(String(err))
}
```

- Note that a caught error is `unknown`, **not** `Error`
- JavaScript lets you throw a string, a number, or `undefined`
