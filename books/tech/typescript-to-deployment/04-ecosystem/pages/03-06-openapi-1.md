## OpenAPI from your schemas

- An API that other people call needs documentation, and documentation written by hand is wrong within a week
- It goes stale silently, because nothing fails when the docs and the code disagree
- **OpenAPI** is a specification for describing an HTTP API as a machine-readable document: every path, method, parameter, body and response
- Because it is machine readable, tools can act on it. Render a browsable page, generate a typed client, drive contract tests, configure a gateway
- The valuable move is to generate that document from the schemas already validating your requests
- Then the docs cannot drift, because the same object that rejects a bad body is the one describing the good one

```bash
npm i @asteasolutions/zod-to-openapi
```

```ts
import { OpenAPIRegistry, OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi"

const registry = new OpenAPIRegistry()

registry.registerPath({
  method: "post",
  path: "/orders",
  request: { body: { content: { "application/json": { schema: CreateOrder } } } },
  responses: {
    201: { description: "created", content: { "application/json": { schema: Order } } },
    400: { description: "validation failed" },
  },
})

const doc = new OpenApiGeneratorV31(registry.definitions).generateDocument({
  openapi: "3.1.0",
  info: { title: "Orders", version: "1.0.0" },
})
```
