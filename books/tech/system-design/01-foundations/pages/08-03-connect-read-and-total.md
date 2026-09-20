## Connect, read, and total

- A network request has phases (Module 6, page 1). Each phase needs a limit

| Phase | What it bounds | Example (Node `undici` fetch) |
|---|---|---|
| **Connect** | DNS, TCP, TLS | 10 seconds |
| **Headers** | Wait for the first byte of the response | 300 seconds |
| **Body** | Wait between bytes of the response body | 300 seconds |
| **Total** | Start to finish, absolute deadline | none |

- A "timeout" is often just one of these. If you set a 5-second `connectTimeout` but leave the `headersTimeout` at 300 seconds, a server that accepts the connection and then hangs will hold your request open for five minutes

### The difference

- **Connect** should be short (1–3 seconds). If the host is dead, you want to know immediately so you can retry or fail
- **Read/Headers** should be based on the work the server is doing. A database query might need 50 ms; a report generator might need 10 seconds
- **Total (deadline)** bounds the whole operation, including any retries. It protects the user experience

### The failure

- Setting a 10-second timeout on a library without reading the docs. It was a connect timeout. The target server accepted the socket, then deadlocked. The client waited forever because the connect phase succeeded
