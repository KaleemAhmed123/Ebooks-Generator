## Mongoose

- MongoDB stores documents and enforces no schema. Two records in the same collection can have entirely different fields
- That flexibility is the selling point and the problem. Nothing stops a typo writing `sellerid` next to every existing `sellerId`
- An **ODM** is Object Document Mapper, the document database equivalent of an ORM
- Mongoose adds the schema in your application instead of in the database, and enforces it on every write
- It also supplies types, defaults, required fields, enums, validators and lifecycle hooks that MongoDB itself has no concept of
- A model is the pairing of a schema with a collection, and it is what you actually query through
- The cost is a layer of objects between you and the driver, which is slower and occasionally surprising
- Its hooks fire on some operations and not others, and that gap is the source of most Mongoose bugs
- Created by LearnBoost in 2010, now maintained by Automattic
- Version 9.9.4

```bash
npm i mongoose
```

```ts
import mongoose, { Schema, model } from "mongoose"

const orderSchema = new Schema({
  sellerId: { type: String, required: true, index: true },
  total:    { type: Number, required: true, min: 1 },
  status:   { type: String, enum: ["pending", "paid"], default: "pending" },
  items:    [{ productId: String, quantity: Number }],
}, { timestamps: true })

orderSchema.index({ sellerId: 1, status: 1 })

export const Order = model("Order", orderSchema)

await mongoose.connect(process.env.MONGO_URL)
```

- `timestamps: true` adds `createdAt` and `updatedAt` and maintains them
- MongoDB itself has no schema. Mongoose adds one in your application
