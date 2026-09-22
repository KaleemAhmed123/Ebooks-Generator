## REST vs gRPC between services

- Two ways to make a synchronous call. **REST**: resources at URLs, JSON bodies, HTTP verbs, usually HTTP/1.1, a schema if someone writes the OpenAPI file. **gRPC**: a `.proto` file defines the service and its messages first, the code on both sides is generated from it, Protocol Buffers on the wire, HTTP/2 underneath with multiplexing and streaming. The difference that matters between services is schema-first versus schema-optional

| | REST + JSON | gRPC + protobuf |
| :--- | :--- | :--- |
| **contract** | resource-first; the schema is a document beside the code, kept accurate by discipline | schema-first; the `.proto` is the code, and a field rename fails the build on both sides |
| **payload** | text, self-describing, larger; readable in a log | binary, field numbers not names, smaller; needs the schema to read |
| **protocol** | HTTP/1.1 in practice: one request per connection at a time, keep-alive pools | HTTP/2: many streams on one connection, server and bidirectional streaming, deadlines built in (Module 4, page 1) |
| **evolution** | add fields freely; nothing checks the reader (Module 5, page 2) | add fields with new numbers; never reuse a number; the generated reader ignores unknown fields |
| **from a browser** | native | not directly: browsers do not expose HTTP/2 framing, so gRPC-Web through a proxy such as Envoy |
| **where it fits** | the public API, anything a browser or a partner calls | service to service inside the boundary, especially chatty or streaming calls |

- Usually both: REST at the edge, where clients are browsers and partners; gRPC inside, where forty services need a contract the compiler checks and a connection they can multiplex; the gateway (page 5) is where one becomes the other. Speed is not the difference: a hop's cost is the round trip and the tail (Module 1, page 5), not the encoding

### The failure

- REST between forty internal services with no enforced schema. A team renames `userId` to `user_id`, every test in its own repository passes, and three consumers read `undefined` in production. Nothing checked the contract because there was no contract, only a convention; page 4 of Module 5 is the fix for REST, and gRPC is the fix by construction. The mirror failure: gRPC straight from a browser, which cannot speak it, and a proxy added in a hurry
