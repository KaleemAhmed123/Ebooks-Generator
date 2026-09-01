### Raw JSON Schema, when the shape is not a Zod type

```ts
output_config: {
  format: {
    type: "json_schema",
    schema: {
      type: "object",
      properties: { category: { type: "string" }, urgency: { type: "integer" } },
      required: ["category", "urgency"],
      additionalProperties: false,
    },
  },
}
```

### The two features, and when each fits

- **`output_config`** constrains the whole reply. Use it when the endpoint returns an object
- **`strict: true` on a tool** constrains only that tool's arguments. Use it when the model is choosing an action
- They are independent and can be used in the same request
- The first call with a new schema is slower while the grammar is compiled, then it is cached. **Keep schemas stable** rather than generating them per request
