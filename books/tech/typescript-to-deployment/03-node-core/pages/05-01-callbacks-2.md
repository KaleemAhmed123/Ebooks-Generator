### Why they were replaced

```js
readOrder(id, (err, order) => {
  if (err) return cb(err)
  readSeller(order.sellerId, (err, seller) => {
    if (err) return cb(err)
    readPayouts(seller.id, (err, payouts) => {
      if (err) return cb(err)
      cb(null, { order, seller, payouts })
    })
  })
})
```

- Error handling repeats at every level, and forgetting one swallows the failure silently

### Turning a callback API into a promise

```js
import { promisify } from "node:util"

const readFile = promisify(fs.readFile)
const data = await readFile("orders.csv")
```

- Works on any function following the error-first convention
