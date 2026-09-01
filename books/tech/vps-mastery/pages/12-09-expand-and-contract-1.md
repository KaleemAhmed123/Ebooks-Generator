## Expand and contract

- During a zero-downtime deploy, **old code and new code run at the same time**. A migration that breaks the old code takes the site down during the flip
- The rule: every schema change must be compatible with the version currently running

### Renaming a column, the wrong way

```sql
ALTER TABLE orders RENAME COLUMN total TO total_amount;
```

- Every request still served by the old containers now fails. The rename is instant and the deploy is not

### The three-deploy pattern

**Deploy 1, expand.** Add the new thing. Nothing reads it yet

```sql
ALTER TABLE orders ADD COLUMN total_amount numeric;
UPDATE orders SET total_amount = total WHERE total_amount IS NULL;
```

**Deploy 2, migrate the code.** Write both, read the new one

```ts
await db.order.update({ where: { id }, data: { total: v, total_amount: v } });
```

**Deploy 3, contract.** Once no running code touches the old column

```sql
ALTER TABLE orders DROP COLUMN total;
```
