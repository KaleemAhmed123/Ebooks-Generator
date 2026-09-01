### The ones worth using deliberately

| Code | When |
|---|---|
| `200 OK` | it worked and there is a body |
| `201 Created` | something now exists. Send a `Location` header |
| `202 Accepted` | queued, not done. Send a way to check progress |
| `204 No Content` | it worked and there is nothing to send |
| `304 Not Modified` | the caller already has the current version |
| `400 Bad Request` | malformed, unparseable |
| `401 Unauthorized` | no credentials, or bad ones. Actually means unauthenticated |
| `403 Forbidden` | good credentials, wrong permissions |
| `404 Not Found` | it does not exist, or you may not know it does |
| `409 Conflict` | it clashes with the current state |
| `422 Unprocessable` | parsed fine, failed validation |
| `429 Too Many Requests` | rate limited. Send `Retry-After` |
| `500 Internal Server Error` | your bug |
| `502` `503` `504` | upstream failed, unavailable, timed out |

### The 401 and 403 split

- `401` means the server does not know who you are
- `403` means it knows and the answer is still no
- Returning `404` instead of `403` is a deliberate choice when the existence of the resource is itself private
