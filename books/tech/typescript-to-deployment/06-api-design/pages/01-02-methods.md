## Methods and what they promise

- A method is a promise about what the request does, and clients, proxies and caches all rely on that promise
- **Safe** means it changes nothing. A crawler may call it freely
- **Idempotent** means calling it five times leaves the same state as calling it once
- Those two properties are why a browser will re-issue a `GET` on a refresh and warn before re-issuing a `POST`

| Method | Safe | Idempotent | Body | Use |
|---|---|---|---|---|
| `GET` | yes | yes | no | read a resource |
| `HEAD` | yes | yes | no | headers only, to check existence or size |
| `OPTIONS` | yes | yes | no | what is allowed here, and CORS preflight |
| `POST` | no | **no** | yes | create, or an action that is not CRUD |
| `PUT` | no | yes | yes | replace the whole resource |
| `PATCH` | no | no | yes | change part of a resource |
| `DELETE` | no | yes | no | remove it |

### Why POST is the odd one

- `POST` is the only common method that is not idempotent, which is why a retried checkout can charge twice
- That is not a flaw to design around. It is a signal that any `POST` moving money needs an idempotency key

### PUT against PATCH

- `PUT` replaces. Fields you leave out are **deleted**, and that surprises people who use it as a partial update
- `PATCH` changes only what you send
- Sending a partial body to `PUT` is one of the quieter ways to lose data
