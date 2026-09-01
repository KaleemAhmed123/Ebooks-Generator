## Recap of Module 5

:::interview
Why does `as` not make code safe?

- `as` is a **type assertion**. It does not convert, check or validate anything
- It tells the compiler to stop disagreeing with you and carry on
- The types are erased at build time, so at runtime there is nothing left to enforce the claim
- If the value does not match, you get no error at the assertion. You get a crash later, somewhere else, in code that looks innocent
:::

### The two lines side by side

```ts
const user = req.body as User          // a claim
const user = User.parse(req.body)      // a check
```

- The first compiles and hopes
- The second throws immediately, at the boundary, with the field that was wrong

### When `as` is legitimate

- Inside a branded-type constructor, where the check happened one line earlier
- Narrowing a value you have already validated with a guard
- `as const`, which is a different feature that happens to share the keyword

<p class="verified">Verified against typescript 7.0.2, zod 4.5.4, node 24 LTS, express 5, on 2026-08-30</p>
