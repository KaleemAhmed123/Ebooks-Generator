## The 404 handler

- Express has a default handler that sends an HTML page, which is wrong for an API
- Catching unmatched routes yourself keeps every response the same shape

```js
app.use("/api", routes)

app.use((req, res) => {
  res.status(404).json({
    code: "route_not_found",
    method: req.method,
    path: req.originalUrl,
  })
})

app.use(errorHandler)
```

- It sits **after** the routes and **before** the error handler
- Reaching it means no route matched, so it needs no `next`

### Two different 404s

- **Route not found** means the URL does not exist. That is this handler
- **Resource not found** means the URL is valid and the row is missing. That is a thrown `AppError`
- Giving them different codes lets a client tell a typo from a deleted order

### Catching unhandled failures around Express

```js
process.on("unhandledRejection", (reason) => {
  logger.fatal({ reason }, "unhandled rejection")
  process.exit(1)
})
```

- Express only catches what happens inside a request
- A rejected promise in a timer or an event listener never reaches it
