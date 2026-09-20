## Connect, read, and total

- A network request has phases (Module 6, page 1). Each phase needs a limit

| Phase | What it bounds | A sane value |
|---|---|---|
| **Connect** | DNS, TCP, TLS | 1–3 s: a dead host should fail fast |
| **Headers** | wait for the first byte of the response | the callee's p99.9 plus a margin (next page) |
| **Body** | wait between bytes of the body | same, per chunk |
| **Total** | start to finish, including retries | the user's patience, passed down as a deadline |

- A library's "timeout" is often just one of these. Set a 5-second `connectTimeout` and leave `headersTimeout` at undici's 300-second default, and a server that accepts the connection then hangs holds your request for five minutes. The defaults are on page 8 of Module 6

### The difference

- **Connect** should be short (1–3 seconds). If the host is dead, you want to know immediately so you can retry or fail
- **Read/Headers** should be based on the work the server is doing. A database query might need 50 ms; a report generator might need 10 seconds
- **Total (deadline)** bounds the whole operation, including any retries. It protects the user experience

### The failure

- Setting a 10-second timeout on a library without reading the docs. It was a connect timeout. The target server accepted the socket, then deadlocked. The client waited forever because the connect phase succeeded
