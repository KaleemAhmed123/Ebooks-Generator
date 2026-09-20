## Idempotent means "same effect"

- RFC 9110 (HTTP Semantics) defines idempotency: a request method is idempotent if "the intended effect on the server of multiple identical requests with that method is the same as the effect for a single such request"
- It does not mean the *response* is identical. The first delete might return `200 OK`; the second might return `404 Not Found`. But the *effect* on the server — the record being gone — is the same

| Method | Idempotent? | Why |
|---|---|---|
| **GET, HEAD** | Yes | Read-only. They have no effect |
| **PUT** | Yes | Replaces the whole resource. `x = 5` done twice is still 5 |
| **DELETE** | Yes | Deleting an already-deleted resource leaves it deleted |
| **POST** | No | By default, it appends or executes. `array.push(5)` done twice adds two items |
| **PATCH** | Usually no | `x += 5` done twice adds 10 |

- The RFC then draws the line that matters: an idempotent request "can be repeated automatically if a communication failure occurs before the client is able to read the server's response", and a client "SHOULD NOT automatically retry a request with a non-idempotent method"

### The failure

- Writing an API endpoint that handles a `PUT` request by incrementing a counter in the database. `PUT` must be idempotent. If a client follows the RFC and retries a timed-out `PUT`, the counter goes up twice
