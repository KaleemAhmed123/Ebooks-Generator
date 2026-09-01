## The five kinds of middleware

- Middleware is the only extension point Express has, which is why nearly every library plugs in as one

**Application level**, on every request

```js
app.use(helmet())
```

**Router level**, on one feature

```js
router.use(requireAuth)
```

**Route level**, on one endpoint, passed as arguments

```js
app.post("/orders", requireAuth, validate({ body: CreateOrder }), createOrder)
```

**Error handling**, recognized by four parameters

```js
app.use((err, req, res, next) => { ... })
```

**Built in**, shipped with Express

```js
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(express.raw({ type: "application/octet-stream" }))
app.use(express.text())
```
