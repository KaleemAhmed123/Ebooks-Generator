### The four ingredients of every prompt that works

| Ingredient | Removes |
|---|---|
| **Role and task** | uncertainty about what job this is |
| **Context** | the need to invent facts it does not have |
| **Output shape** | free choice of format |
| **Constraints** | edge cases resolved by guesswork |

```text
You are a support triage assistant for an e-commerce backend.

Classify the ticket below using only these categories:
billing, delivery, technical, other.

If the ticket mentions a payment and a delivery, choose billing.
If you cannot tell, choose other. Never invent a category.

Ticket:
{{ticket}}
```

- Every line there answers a question the model would otherwise answer for itself, differently each time

### The habit that replaces guesswork

- **When output is wrong, find the ambiguity rather than adding emphasis.** Writing IMPORTANT in capitals is not a fix
- Structured output, from Modules 2 and 3, removes format instructions entirely. Prefer a schema over asking politely for JSON
