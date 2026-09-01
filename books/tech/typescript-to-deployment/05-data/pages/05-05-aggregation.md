## The aggregation pipeline

- `find` returns documents as they are stored. Anything that groups, joins or reshapes needs more
- The **aggregation pipeline** is a list of stages, each taking documents in and passing documents out
- It is the same idea as piping shell commands, and it is where MongoDB does the work SQL does with `GROUP BY` and `JOIN`

```js
db.orders.aggregate([
  { $match: { status: "paid", createdAt: { $gte: startOfMonth } } },
  { $group: { _id: "$sellerId", revenue: { $sum: "$totalPaise" }, orders: { $sum: 1 } } },
  { $sort: { revenue: -1 } },
  { $limit: 10 },
  { $lookup: { from: "sellers", localField: "_id", foreignField: "_id", as: "seller" } }
])
```

| Stage | Does |
|---|---|
| `$match` | filters, and belongs first so an index can be used |
| `$group` | aggregates by a key |
| `$sort` `$limit` `$skip` | ordering and paging |
| `$lookup` | a left outer join to another collection |
| `$unwind` | turns one document with an array into many documents |
| `$project` | reshapes the output fields |

### The two rules

- **`$match` first, always.** Only the first stage can use an index, so filtering later means scanning everything
- **`$lookup` is not a real join.** It runs a query per input document, so it belongs after `$limit`, not before
