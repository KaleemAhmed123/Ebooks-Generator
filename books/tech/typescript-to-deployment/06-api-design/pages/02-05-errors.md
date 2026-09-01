## Error responses

- An error is part of the API contract, and an inconsistent one forces every client to special-case every endpoint
- The failure mode is a body that varies: sometimes a string, sometimes `{error}`, sometimes `{message}`, occasionally a 200 with `success: false`
- **RFC 9457** standardizes it, and it replaced RFC 7807 in 2023

```http
HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json
```

```json
{
  "type": "https://api.example.com/problems/validation-failed",
  "title": "Validation failed",
  "status": 422,
  "detail": "totalPaise must be greater than 0",
  "instance": "/api/v1/orders",
  "requestId": "r_8f14e45f",
  "errors": [
    { "field": "totalPaise", "code": "min", "message": "must be greater than 0" }
  ]
}
```

| Field | Purpose |
|---|---|
| `type` | a stable URI a client can branch on. The real identifier |
| `title` | a short human summary of that type |
| `status` | the HTTP code, repeated for clients that lose it |
| `detail` | what went wrong this time |
| `instance` | which request it happened on |

### The three rules

- **Never return 200 for a failure.** Every client, proxy and monitor reads the status code first
- **Branch on `type` or a code, never on the message.** Messages get reworded and translated
- **Include a request id in every error.** It turns a user complaint into a log search
