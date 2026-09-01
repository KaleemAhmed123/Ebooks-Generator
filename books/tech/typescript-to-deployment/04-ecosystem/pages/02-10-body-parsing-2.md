### Handling a bad body

```js
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ code: "invalid_json" })
  }
  next(err)
})
```

- Malformed JSON throws inside the parser. Without this the client gets a 500 for their own mistake
