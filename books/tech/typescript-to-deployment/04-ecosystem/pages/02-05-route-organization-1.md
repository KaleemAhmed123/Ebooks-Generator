## Chaining and grouping routes

- Repeating the same path string on five lines drifts the moment someone renames it
- `app.route` binds one path once and hangs the methods off it

```js
app.route("/orders/:id")
  .get(getOrder)
  .patch(requireAuth, updateOrder)
  .delete(requireAuth, requireAdmin, deleteOrder)
```

### `Router`, the unit of composition

- A `Router` is a mountable mini application, and it exists so a feature can own its routes without knowing where they will live

```js
// orders.routes.js
import { Router } from "express"

const router = Router()

router.use(requireAuth)                 // applies to every route below
router.get("/", listOrders)
router.get("/:id", getOrder)

export default router
```
