## Seeing what happened

- An LLM call is the least observable thing in a backend: no query plan, no status code beyond `200`, and a different answer every time
- Without deliberate instrumentation, the only signal is a bill at the end of the month

```ts
const result = await generateText({
  model: registry.languageModel("anthropic:chat"),
  prompt,
  telemetry: {
    isEnabled: true,
    functionId: "support-reply",
    metadata: { tenantId, userId },
  },
  onEnd: ({ usage, finishReason, steps }) => {
    logger.info({ ...usage, finishReason, steps: steps.length }, "llm call")
  },
})
```

- Telemetry emits **OpenTelemetry** spans, which is the same tracing covered in Booklet 4, so these calls appear beside the database spans in one trace
- `functionId` is what lets a dashboard group cost by feature rather than by model

### What to record on every call

| Field | Answers |
|---|---|
| `usage.inputTokens`, `outputTokens` | what it cost |
| `finishReason` | whether it was truncated or refused |
| `steps.length` | whether an agent looped |
| model id and `functionId` | which feature and which model |
| tenant or user id | who to bill, and who to rate limit |

### The v7 callback renames

- **`onFinish` is now `onEnd`**, and `onStepFinish` is `onStepEnd`. The old names still work and are deprecated
- On a multi-step call, top-level `usage` sums every step. `finalStep.usage` is the last one only, and confusing the two makes cost reports wrong
