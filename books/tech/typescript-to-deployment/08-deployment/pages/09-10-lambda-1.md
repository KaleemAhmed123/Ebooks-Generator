## Lambda

- **Lambda runs a function in response to an event**, with no server, no container to keep warm, and billing per millisecond of execution
- When there is no traffic there is no cost, which is a genuinely different economic shape from everything else in this module

```ts
export const handler = async (event) => {
  const body = JSON.parse(event.body ?? "{}")
  return { statusCode: 200, body: JSON.stringify({ ok: true }) }
}
```

### Where it fits well

- **Event handlers**: an S3 upload, an SQS message, an EventBridge schedule, a DynamoDB stream
- **Spiky, low-average traffic**, such as a webhook receiver or an internal tool
- **Glue**: the small job that runs nightly and would otherwise need a machine
