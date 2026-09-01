## Structuring an Express service

- Express enforces nothing, so pick a shape and hold it

```
src/
  index.ts              boot, listen, graceful shutdown
  app.ts                the express app, no listen
  config/env.ts         zod-validated environment
  middleware/
    error-handler.ts
    require-auth.ts
    validate.ts
  modules/
    orders/
      orders.routes.ts     paths and middleware only
      orders.controller.ts req and res, nothing else
      orders.service.ts    business rules, no req or res
      orders.repo.ts       database calls only
      orders.schema.ts     zod schemas
```
