## Long-running work over an API

- Some requests cannot be answered inside an HTTP timeout. A report over a year of orders, a bulk import, a video transcode
- Holding the connection open fails at the load balancer, the client, or both, and a retry starts the work again
- The pattern is to accept the work, answer immediately, and give the caller a way to follow it

```http
POST /api/v1/reports

HTTP/1.1 202 Accepted
Location: /api/v1/jobs/j_91c

{ "jobId": "j_91c", "status": "queued" }
```

```http
GET /api/v1/jobs/j_91c

{ "status": "running", "progress": 0.4 }
{ "status": "succeeded", "resultUrl": "https://.../reports/j_91c.csv" }
{ "status": "failed", "error": { "code": "source_unavailable" } }
```

### Three ways for the caller to find out

| Method | Good | Bad |
|---|---|---|
| **Polling** the job URL | trivial, works everywhere | wasteful, and latency is the poll interval |
| **Webhook** on completion | no waiting, no waste | the caller needs a public endpoint |
| **SSE or WebSocket** | live progress | a held connection per caller |

- Offer polling always, because it is the only one that works for every caller
- Add a webhook for machine consumers and a stream for a dashboard watching progress
- **The job id must be idempotent on the request.** A retried `POST` should return the existing job, not queue a second one
