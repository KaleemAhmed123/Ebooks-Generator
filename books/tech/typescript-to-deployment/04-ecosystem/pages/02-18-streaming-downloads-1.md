## Streaming responses

- `res` is a writable stream, so anything large should be piped rather than buffered
- Building a 200MB CSV in memory to send it is how a container hits its limit

```js
import { pipeline } from "node:stream/promises"

app.get("/orders/export", async (req, res) => {
  res.set("Content-Type", "text/csv")
  res.set("Content-Disposition", 'attachment; filename="orders.csv"')

  await pipeline(
    db.orders.findMany({ where: { sellerId: req.user.sellerId } }).stream(),
    async function* (rows) {
      yield "id,total,status\n"
      for await (const row of rows) yield `${row.id},${row.total},${row.status}\n`
    },
    res
  )
})
```

- Memory stays flat whether the export is a hundred rows or a million
- `pipeline` destroys the database cursor if the client disconnects halfway
