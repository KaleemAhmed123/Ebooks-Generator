### Output guardrails, after it

```ts
const result = await generateObject({ model, schema: Answer, prompt })

if (!result.object.sourceIds.every((id) => allowedIds.has(id))) {
  logger.warn({ runId }, "cited a source it was not given")
  return FALLBACK
}

if (containsOtherTenantIds(result.object.answer, tenantId)) {
  return FALLBACK
}
```

- **Schema validation is the cheapest guardrail there is**, and it catches the largest share of failures
- Checking citations against what was actually retrieved turns hallucination from invisible into detectable

### The rules

- **Deterministic checks first.** A regular expression, a schema and a set lookup are free next to a second model call
- **Use a model as a judge only for what code cannot decide**, such as tone or safety, and use a small one
- **Every guardrail needs a fallback**, and the fallback is a plain message, not an error page
- **Log every trip.** A guardrail that fires constantly is a prompt problem; one that never fires may be broken
