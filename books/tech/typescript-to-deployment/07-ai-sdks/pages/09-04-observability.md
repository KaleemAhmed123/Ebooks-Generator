## Seeing inside it

- A failing LLM feature returns `200` with a wrong answer. No status code, no stack trace, no slow query
- **The only debuggable artifact is the transcript**: what went in, what came back, which tools ran, and what they returned

### What to record for every call

| Field | Answers |
|---|---|
| prompt id and version | which text produced this |
| model id | which model, since it will change |
| input and output tokens | what it cost |
| latency, and time to first token | which half is slow |
| finish reason | truncated, refused, or complete |
| tool calls and results | what it actually did |
| tenant, user, feature | who and where |

```ts
telemetry: { isEnabled: true, functionId: "support-reply",
             metadata: { tenantId, promptVersion: TRIAGE.version } }
```

- The AI SDK emits **OpenTelemetry** spans, so these appear in the same trace as the database and HTTP spans from Booklet 4

### Storing prompts and answers

- Keeping them is what makes an evaluation set possible, and it is also personal data with a retention policy
- **Redact before storing**, keep them for a bounded period, and let a tenant opt out

### The four numbers worth a dashboard

- **Cost per feature per day**, which is what makes a spike explainable
- **p95 latency and time to first token**, since users feel the second one
- **Error and refusal rate**, split by model
- **Steps per agent run**, where a rising average means the agent is getting lost
