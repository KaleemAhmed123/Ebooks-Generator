## Querying

- Queries are documents describing what to match, which is why they nest naturally

```js
db.orders.find({
  sellerId: "s1",
  status: { $in: ["paid", "shipped"] },
  totalPaise: { $gte: 10000 },
  createdAt: { $gte: new Date("2026-08-01") }
}).sort({ createdAt: -1 }).limit(20)
```

| Operator | Matches |
|---|---|
| `$eq` `$ne` | equal, not equal |
| `$gt` `$gte` `$lt` `$lte` | comparisons |
| `$in` `$nin` | in a list, not in a list |
| `$exists` | the field is present at all |
| `$regex` | pattern, and slow without an anchored prefix |
| `$elemMatch` | one array element matching several conditions at once |

### Updating

```js
db.wallets.updateOne(
  { sellerId: "s1", balancePaise: { $gte: 40000 } },
  { $inc: { balancePaise: -40000 } }
)
```

- `$inc`, `$set`, `$push`, `$pull` and `$unset` modify in place rather than replacing the document
- Passing a plain object without an operator **replaces the whole document**, silently deleting every field you left out
- That is the single most destructive MongoDB mistake, and it looks like an ordinary update
