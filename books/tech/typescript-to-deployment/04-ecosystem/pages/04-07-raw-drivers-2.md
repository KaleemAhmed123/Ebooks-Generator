### Knex 3.3, a query builder

```ts
const orders = await knex("orders")
  .where({ seller_id: sellerId })
  .whereIn("status", ["paid", "shipped"])
  .orderBy("created_at", "desc")
  .limit(20)
```

- Builds SQL, does not manage entities. Also the migration tool many teams keep even after moving to an ORM

### When raw wins

- A reporting query with three CTEs and a window function
- Bulk inserts where the ORM's per-row overhead shows up in a profile
