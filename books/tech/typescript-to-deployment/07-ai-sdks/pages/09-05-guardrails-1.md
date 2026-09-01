## Guardrails

- A model will occasionally produce something you cannot ship: off-topic, unsafe, leaking another record, or simply the wrong shape
- **A guardrail is a check around the call**, not an instruction inside it. Prompts are guidance; guardrails are code that can say no

### Input guardrails, before the call

| Check | Catches |
|---|---|
| length and token cap | a pasted book, and the bill with it |
| topic classifier | requests the product does not serve |
| PII detection | data that should never reach a provider |
| rate and budget check | the abusive caller |
