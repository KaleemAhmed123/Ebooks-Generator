# Module 2 - HTTP servers

## Express

- Node's own `http` module can answer a request, but it hands you a raw URL string and a raw body stream
- Everything else is yours to build: matching `/orders/o1` to a function, parsing JSON, reading cookies, setting a status code
- Writing that once is a morning's work. Writing it correctly on every project is a framework
- A **web framework** supplies routing, request and response helpers, and a way to run shared code before a handler
- Express is the oldest and most used of them in Node, and it supplies those four things and almost nothing else
- It makes no decision about your database, your validation, your folder layout or your logging
- That restraint is why it is still the default after fifteen years. Nothing it forces on you can go out of date
- The cost is that no two Express projects look alike, and every decision past routing is one you have to make yourself
- Created by TJ Holowaychuk in 2010, now maintained by the OpenJS Foundation
- Version 5.2.1, released after ten years on version 4

```bash
npm i express
```

```js
import express from "express"

const app = express()

app.use(express.json())

app.get("/orders/:id", (req, res) => {
  res.json({ id: req.params.id })
})
