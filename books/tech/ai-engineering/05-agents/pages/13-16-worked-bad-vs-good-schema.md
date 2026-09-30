## Worked: a bad schema vs a good one

- Same function, two schemas. The first produces misfires; the second just works. Read them as the model would.

:::mint
```json
// ✗ BAD — vague, unconstrained, ambiguous
{ "name": "data",
  "description": "Gets data.",
  "input_schema": { "type": "object", "properties": {
      "q": { "type": "string" },
      "t": { "type": "string" } } } }

// ✓ GOOD — clear purpose, constrained, described
{ "name": "search_orders",
  "description": "Search a customer's past orders by keyword. Use when the
     user asks about their order history. Requires a logged-in customer.",
  "input_schema": { "type": "object", "properties": {
      "query":  { "type": "string",
                  "description": "Keyword, e.g. 'blue shoes'" },
      "status": { "type": "string", "enum": ["shipped","pending","returned"],
                  "description": "Optional filter by order status" } },
    "required": ["query"] } }
```
:::

- **What the bad schema breaks:** `"data"` matches nothing specific, so the model calls it randomly or never. `q` and `t` are unguessable — the model fills them with junk. No enums, no required, no examples: every argument is a coin flip.
- **What the good schema fixes:** the name and description pin *what* and *when*; the precondition ("requires a logged-in customer") sequences it correctly; `query`'s example shows the format; `status`'s enum forbids invalid filters; `required` forces the one field that matters.

:::note
Nothing about the underlying function changed — same code, same API. The entire quality difference lives in the schema the model reads. This is why experienced builders spend more time on schemas and descriptions than on implementations: the schema is where the model's behavior is programmed.
:::
