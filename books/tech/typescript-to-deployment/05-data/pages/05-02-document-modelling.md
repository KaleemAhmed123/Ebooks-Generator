## Modelling documents

- The only real decision in MongoDB is **embed or reference**, and it is made per relationship
- **Embedding** puts the child inside the parent. One read, no join, and the child cannot be queried on its own
- **Referencing** stores an id and fetches the other document separately, which is a second query

```js
// embedded: items are part of the order and never read alone
{
  _id: ObjectId(),
  sellerId: "s1",
  totalPaise: 50000,
  items: [
    { productId: "p1", quantity: 2, pricePaise: 20000 },
    { productId: "p2", quantity: 1, pricePaise: 10000 }
  ]
}
```

### The three questions that decide it

- **Is the child ever read without the parent?** If yes, reference it
- **Does the child grow without bound?** Embed a thousand comments and every read of the parent carries all of them
- **Is the child updated far more often than the parent?** Rewriting a large document to change one nested field is wasteful

### The hard limit

- A document cannot exceed **16 megabytes**
- An array that grows forever will hit it, and the write that finally fails is in production
- Anything unbounded belongs in its own collection with a reference back
