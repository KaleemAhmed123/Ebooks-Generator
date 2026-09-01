## Drawing a boundary

- The test is **data ownership**. One service writes a table. Everyone else asks that service, or listens to its events
- Two services writing the same table are one service that has been split incorrectly

### Split by domain, not by layer

```
wrong                      right
  api-service                orders
  business-logic-service     payments
  data-service               shipping
                             catalog
```

- The left column means every feature touches all three services and they deploy together
- The right column means a change to shipping is one deploy

### The questions that reveal the seam

- **What changes together?** Things that always change in the same commit belong in the same service
- **What data does this own?** If a service cannot answer without querying another service's tables, the line is wrong
- **Who is on call for it?** A boundary nobody owns will rot
- **Can it fail alone?** If the whole product is down when it is down, separating it bought nothing

### Synchronous or asynchronous between them

- **Synchronous** when the caller needs the answer to make its next decision. Checking stock before accepting an order
- **Asynchronous** when the caller's job is finished. Telling the world an order was paid
- Every synchronous hop multiplies failure. Three services at 99.9 percent in a chain is 99.7 percent
- Which is why a chain of synchronous calls is the shape that turns one slow service into a full outage
