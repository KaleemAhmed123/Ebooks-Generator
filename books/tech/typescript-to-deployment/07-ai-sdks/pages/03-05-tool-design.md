## Writing tools the model can use

- A tool that is called at the wrong time, or with invented arguments, is almost always a description problem rather than a model problem
- **The description is the prompt for that tool.** It is the only thing the model has to decide with, so it deserves the same care as the system prompt

```ts
{
  name: "refund_order",
  description: [
    "Refund a delivered order to the original payment method.",
    "Use only after confirming the order id with the customer.",
    "Do not use for undelivered orders; cancel_order handles those.",
  ].join(" "),
  input_schema: {
    type: "object",
    properties: {
      orderId: { type: "string", description: "Order id, like o_842" },
      reason:  { type: "string", enum: ["damaged", "late", "wrong_item"] },
    },
    required: ["orderId", "reason"],
  },
  strict: true,
}
```

### The rules that fix most tool problems

- **Say when not to use it**, and name the tool that should be used instead. Overlapping tools are the main cause of wrong calls
- **Describe every parameter**, including its format. `"Order id, like o_842"` prevents an invented `12345`
- **Use `enum` wherever the set is closed.** It removes free-text guessing entirely
- **`strict: true`** makes the arguments match the schema exactly
- **Few tools beat many.** Past roughly twenty, accuracy falls off, and the tool definitions themselves fill the context window

### Returning results

- Return **compact JSON**, not a whole database row. Every field costs tokens on this turn and on every turn after it
- On failure, return the error as a normal result with `is_error: true` rather than throwing. The model can then apologize or try another approach
