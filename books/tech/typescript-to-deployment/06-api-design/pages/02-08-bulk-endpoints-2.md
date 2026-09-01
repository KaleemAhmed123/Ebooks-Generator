### Partial success

```http
HTTP/1.1 207 Multi-Status

{
  "results": [
    { "index": 0, "status": 201, "id": "p_1" },
    { "index": 1, "status": 422, "error": { "code": "price_required" } }
  ],
  "succeeded": 498,
  "failed": 2
}
```

- **`207` is the honest status.** A `200` hides the failures and a `400` hides the successes
- Return results **in the order they were sent**, with the index, so the client can match them without guessing

### The rules

- **Cap the batch size**, usually 100 to 1000, and reject anything larger with a clear message rather than timing out
- **One idempotency key covers the whole batch**, so a retry does not create the 498 that already succeeded
- **Past a few thousand records, stop being synchronous.** Accept the upload, return `202` with a job id, and use the async pattern from Module 6
