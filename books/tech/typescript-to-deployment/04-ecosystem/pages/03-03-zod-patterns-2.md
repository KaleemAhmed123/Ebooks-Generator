### Discriminated unions

```ts
const Event = z.discriminatedUnion("type", [
  z.object({ type: z.literal("order.paid"), orderId: z.string() }),
  z.object({ type: z.literal("order.shipped"), awb: z.string() }),
])
```

- Faster than a plain union, because it checks the discriminator first
- The inferred type narrows on `type`, exactly as in Booklet 1

### Reusing one schema everywhere

- One schema can validate a request body, type a service argument, and generate OpenAPI docs
