## Parameters, enums, and JSON-Schema depth

- Parameters are where wrong arguments come from. Constrain them so the model cannot supply nonsense, and describe each so it supplies the right thing.
- **Use enums for closed sets.** If a field has known valid values, list them — the model then picks from the menu instead of inventing a string.

:::mint
```json
"properties": {
  "status": { "type": "string",
              "enum": ["open", "closed", "pending"],   // not free text
              "description": "Ticket status to filter by" },
  "limit":  { "type": "integer", "minimum": 1, "maximum": 100,
              "description": "Max results (default 20)" },
  "email":  { "type": "string", "format": "email" }
}
```
:::

- **Constrain types and ranges.** `integer` with `minimum`/`maximum`, `format: "email"` / `"date-time"`, `pattern` for regex-shaped strings. Every constraint is a class of bad argument the model cannot produce.
- **Describe every parameter**, even "obvious" ones. `"city"` alone is ambiguous; `"City name in English, e.g. 'Munich' not 'München'"` removes a whole failure class. Give an example in the description — models copy examples.
- **Keep nesting shallow.** Deeply nested objects and arrays-of-objects raise the error rate; the model fumbles complex shapes. Prefer flat parameters; if you need structure, keep it one level deep and describe it well.
- **Mark `required` honestly.** Required fields force the model to supply them; optional fields with sensible server-side defaults keep calls simple. Do not mark everything required — it makes the model invent values for things it should omit.

:::warn
Over-constraining backfires too. A regex `pattern` that is slightly wrong will reject the model's *correct* answer, and it will loop trying to satisfy an impossible schema. Constrain what genuinely has a closed form (enums, ranges, known formats); leave genuinely free text free. The schema should forbid the impossible, not second-guess the reasonable.
:::
