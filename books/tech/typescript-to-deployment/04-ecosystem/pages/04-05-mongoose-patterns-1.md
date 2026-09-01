## Mongoose patterns worth knowing

### Populate, and why it is not a join

```ts
const order = await Order.findById(id).populate("sellerId")
```

- MongoDB has no joins. `populate` runs a **second query** and stitches the results
- Populating three fields on a hundred documents is four queries, not one
- For anything hot, store the two or three fields you actually display on the order itself

### Hooks

```ts
orderSchema.pre("save", function (next) {
  this.total = this.items.reduce((sum, i) => sum + i.price, 0)
  next()
})
```

- `pre("save")` does **not** fire on `updateOne` or `findOneAndUpdate`
- That gap is where "the hook did not run" bugs come from

### Atomic updates

```ts
await Wallet.updateOne(
  { sellerId, balance: { $gte: amount } },
  { $inc: { balance: -amount } }
)
```

- Returns `modifiedCount`. Zero means the balance was too low, so refuse
- Same conditional-update idea as Prisma's `updateMany`
