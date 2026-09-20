## REST vs gRPC between services

- When services talk synchronously, the two dominant choices are REST (JSON over HTTP/1.1) and gRPC (Protocol Buffers over HTTP/2)
- gRPC is optimized for server-to-server communication. It is schema-first, strongly typed, and compresses payloads efficiently. It supports multiplexing and streaming natively over HTTP/2

| Feature | REST | gRPC |
|---|---|---|
| **Payload** | JSON (text-based, large, flexible) | Protobuf (binary, compact, strict) |
| **Contract** | Resource-first (`GET /users/123`). Schema is optional (OpenAPI) | Schema-first (`.proto` file). Methods act like function calls |
| **Protocol** | Usually HTTP/1.1 (one request per connection) | HTTP/2 (multiplexed, bidirectional streaming) |
| **Browser support** | Native | Requires a proxy (gRPC-Web or Envoy) because browsers do not expose raw HTTP/2 framing |

### The failure

- The failure is using REST between 40 internal microservices with no enforced schema. A team renames a JSON field from `userId` to `user_id`, the compiler catches nothing, and production crashes
- The other failure is attempting to use gRPC directly from a web browser without understanding the proxy requirement, turning a simple web app into an infrastructure nightmare
