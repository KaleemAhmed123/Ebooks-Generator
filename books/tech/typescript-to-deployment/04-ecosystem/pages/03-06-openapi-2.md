### Serving it

```bash
npm i swagger-ui-express
```

```ts
import swaggerUi from "swagger-ui-express"
app.use("/docs", swaggerUi.serve, swaggerUi.setup(doc))
```

- **Scalar** is the modern alternative to Swagger UI and looks considerably better
- Fastify does this without a library. `@fastify/swagger` reads the schemas you already wrote
