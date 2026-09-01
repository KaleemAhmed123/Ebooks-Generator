### The client options worth setting once

```ts
const client = new OpenAI({
  timeout: 30_000,        // default is 10 minutes, which is not a timeout
  maxRetries: 2,          // the default
})
```

- **The default 10 minute timeout will hold a request handler open.** Set a real one, as Booklet 6 argues for every outbound call
