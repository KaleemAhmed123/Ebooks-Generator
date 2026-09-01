## The headers that matter

- Headers carry everything that is not the body, and most API behavior is negotiated through them

| Header | Direction | Does |
|---|---|---|
| `Content-Type` | both | what the body is |
| `Accept` | request | what the caller will take back |
| `Authorization` | request | credentials, usually `Bearer <token>` |
| `Idempotency-Key` | request | makes a retry safe |
| `Location` | response | where the new thing lives |
| `ETag` | response | a version tag for this representation |
| `If-None-Match` | request | send the body only if the tag changed |
| `Cache-Control` | both | who may cache this and for how long |
| `Retry-After` | response | how long to wait after a 429 or 503 |
| `X-Request-Id` | both | correlation across services |
| `Sunset` | response | the date this endpoint stops working |

### Conditional requests

```http
GET /api/v1/orders/o_842
If-None-Match: "v7"
```

```http
HTTP/1.1 304 Not Modified
ETag: "v7"
```

- A `304` has no body, which makes it the cheapest possible successful response
- The same tag with `If-Match` on a write gives you optimistic locking over HTTP, so two editors cannot silently overwrite each other
