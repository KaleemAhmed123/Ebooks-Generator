## Middleware and order

- A middleware is a function with `(req, res, next)`
- They run **in the order they were registered**, and that is the whole model

```js
app.use(helmet())                 // 1. security headers
app.use(cors())                   // 2. CORS
app.use(express.json())           // 3. parse the body
app.use(requestId)                // 4. attach a correlation id
app.use(pinoHttp())               // 5. log
app.use("/api", routes)           // 6. your routes
app.use(notFound)                 // 7. nothing matched
app.use(errorHandler)             // 8. four arguments, always last
```

### The error middleware

```js
function errorHandler(err, req, res, next) {
  const status = err.status ?? 500
  req.log.error({ err }, "request failed")
  res.status(status).json({ code: err.code ?? "internal" })
}
```

- Express recognizes it by **four arguments**. Three and it is a normal middleware
- Register it last, after the routes, or it never sees anything

### The ordering mistakes that cost an afternoon

- `express.json()` after the routes, so `req.body` is undefined
- `errorHandler` before the routes, so errors fall through to Express's default HTML page
- `cors()` after a route, so the preflight never gets its headers
