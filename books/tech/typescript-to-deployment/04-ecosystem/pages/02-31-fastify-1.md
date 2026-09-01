## Fastify

- Express treats every route the same. It parses any body the same way and serializes any response with `JSON.stringify`
- That generic path is fine until a service is answering thousands of requests a second, when it becomes measurable
- Fastify asks you to declare the shape of each route's body and response before it will serve them
- Knowing the shape in advance lets it compile a validator and a serializer specific to that one route
- A compiled serializer skips the reflection `JSON.stringify` has to do, which is where most of the speed comes from
- The same schemas then generate your validation errors and your OpenAPI documentation, so they are written once
- The cost is that schemas are mandatory work, and its plugin encapsulation has rules Express does not
- Built by Matteo Collina and Tomas Della Vedova, both Node core contributors
- Version 5.12.1

```bash
npm i fastify
```

```js
import Fastify from "fastify"

const app = Fastify({ logger: true })

app.get("/orders/:id", async (request, reply) => {
  return { id: request.params.id }
})

await app.listen({ port: 3000 })
```

- Returning a value sends it. No `res.json`
- `logger: true` is pino, wired in already
