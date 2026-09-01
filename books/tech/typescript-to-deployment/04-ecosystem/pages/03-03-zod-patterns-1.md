## Zod patterns worth stealing

### Coercing query strings

```ts
const Query = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().max(100).default(20),
})
```

- Everything in a query string is a string. `coerce` converts before validating

### Refining across fields

```ts
const DateRange = z
  .object({ from: z.iso.date(), to: z.iso.date() })
  .refine((v) => v.from <= v.to, {
    message: "from must be before to",
    path: ["from"],
  })
```

### Transforming into your domain type

```ts
const Money = z.string().transform((v) => Math.round(Number(v) * 100))
// "12.34" -> 1234 paise
```

- Validate at the edge, convert once, and the rest of the code sees integers
