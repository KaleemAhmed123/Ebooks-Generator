## What changed in Zod 4

- Worth knowing, because most tutorials online are still Zod 3

### String formats moved to the top level

```ts
// Zod 3
z.string().email()
z.string().uuid()
z.string().url()

// Zod 4
z.email()
z.uuid()
z.url()
z.iso.datetime()
```

- The old methods still work but are deprecated
- The new ones give better error messages and are faster

### Errors are shaped differently

```ts
error.issues     // the array to read
error.format()   // still there
```

### Other changes worth knowing

- Much faster parsing, and a far smaller type footprint, which is what made large schemas slow to type-check
- `z.interface()` for recursive object types without the old `z.lazy` dance
- A `@zod/mini` build for size-sensitive environments
- Metadata via `.meta()`, which is what OpenAPI generators read

```ts
const Order = z.object({ id: z.string() }).meta({
  id: "Order",
  description: "A placed order",
})
```
