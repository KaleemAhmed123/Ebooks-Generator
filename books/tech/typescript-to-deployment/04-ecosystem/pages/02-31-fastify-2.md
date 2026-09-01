### What it does that Express does not

**Schema-based validation and serialization**

```js
app.post("/orders", {
  schema: {
    body: {
      type: "object",
      required: ["sellerId", "total"],
      properties: {
        sellerId: { type: "string" },
        total: { type: "number" },
      },
    },
  },
}, async (request) => createOrder(request.body))
```

- Invalid bodies are rejected before your handler runs
- The response schema also makes serialization faster, because it skips generic `JSON.stringify`

**Plugins with encapsulation.** A plugin's decorators are scoped, so two parts of the app can hold different database clients

### When to pick it

- High request rates where JSON serialization is measurable
- A team that wants validation and docs generated from one schema
