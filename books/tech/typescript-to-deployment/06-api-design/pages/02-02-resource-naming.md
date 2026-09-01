## Naming resources

- URLs are the public surface of the API and the hardest part to change later

```
GET    /api/v1/orders                 list
POST   /api/v1/orders                 create
GET    /api/v1/orders/o_842           read one
PATCH  /api/v1/orders/o_842           update part
DELETE /api/v1/orders/o_842           remove
GET    /api/v1/sellers/s1/orders      a filtered sub-collection
```

### The rules that hold up

- **Plural nouns for collections.** `/orders`, not `/order` and not `/getOrders`
- **No verbs in paths.** The method is the verb. `POST /orders` already says create
- **Lowercase with hyphens.** `/shipping-labels`, not `/shippingLabels`
- **Nest only one level.** `/sellers/s1/orders` is fine. `/sellers/s1/orders/o1/items/i1/reviews` is a maze
- **Prefix ids by type.** `o_842` rather than `842` makes a wrong id obvious in a log line

### Actions that are not CRUD

- Cancelling an order, refunding a payment and resending an invite are not create, read, update or delete
- Two honest options, and both are used widely

```
POST /api/v1/orders/o_842/cancel            an action sub-resource
PATCH /api/v1/orders/o_842 {"status":"cancelled"}   a state change
```

- The action form is clearer when the operation has its own rules, its own permissions and its own side effects
- Forcing everything through `PATCH` produces a handler that branches on which field changed, which is worse than a named endpoint
