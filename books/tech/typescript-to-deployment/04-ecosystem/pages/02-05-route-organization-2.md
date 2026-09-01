## Chaining and grouping routes - continued

```js
// app.js
app.use("/api/v1/orders", ordersRouter)
app.use("/api/v1/sellers", sellersRouter)
```

- The router never hardcodes `/api/v1/orders`, so versioning is a one-line change in `app.js`
- `router.use` before the routes is how you apply auth to a whole feature without repeating it

### `mergeParams`

```js
const router = Router({ mergeParams: true })
```

- Without it, a router mounted at `/sellers/:sellerId` cannot read `req.params.sellerId`
