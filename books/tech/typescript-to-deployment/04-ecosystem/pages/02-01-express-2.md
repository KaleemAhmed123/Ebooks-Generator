## Express - continued

app.listen(3000)
```

- `express.json()` parses a JSON body into `req.body`. Without it, `req.body` is undefined
- A route is a method, a path and a handler
- `app.listen` starts an `http.Server`, the same one from `node:http`

### What Express gives you

- Routing, middleware, `req` and `res` helpers, static files
- That is close to all of it. Validation, auth, ORM and logging are yours to choose

### What that costs

- Two Express projects rarely look alike
- The structure in Module 2 of this booklet is a convention, not a rule the framework enforces
