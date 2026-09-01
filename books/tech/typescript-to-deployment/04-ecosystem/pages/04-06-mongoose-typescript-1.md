## Mongoose with TypeScript

```ts
import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose"

const orderSchema = new Schema({
  sellerId: { type: String, required: true },
  total:    { type: Number, required: true },
  status:   { type: String, enum: ["pending", "paid"], default: "pending" },
}, { timestamps: true })

type Order = InferSchemaType<typeof orderSchema>
type OrderDoc = HydratedDocument<Order>

export const OrderModel = model<Order>("Order", orderSchema)
```

- `InferSchemaType` derives the type from the schema, the same trick Zod uses
- Writing the interface by hand means it drifts the first time someone adds a field

### Indexes

```ts
orderSchema.index({ sellerId: 1, createdAt: -1 })
orderSchema.index({ awb: 1 }, { unique: true, sparse: true })
```

- `autoIndex` is on in development and should be **off in production**
- Building an index on a large collection at boot will stall the process

```ts
mongoose.connect(url, { autoIndex: process.env.NODE_ENV !== "production" })
```

- Create production indexes in a migration or by hand, not on startup
