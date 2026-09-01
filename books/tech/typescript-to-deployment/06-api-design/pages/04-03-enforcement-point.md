## One place to enforce it

- Authorization spread across forty handlers is forty chances to forget, and the one that was forgotten is the one that matters
- The fix is a **single choke point** that every read passes through

```ts
// one function decides what a caller can see, for every query
export function scopeFor(user: User) {
  switch (user.role) {
    case "admin":    return {}
    case "seller":   return { sellerId: user.sellerId }
    case "support":  return { region: user.region }
  }
}

const orders = await db.order.findMany({
  where: { ...scopeFor(req.user), status: "paid" },
})
```

- One function to audit, one function to test, and adding a role changes one place
- Returning a discriminated union rather than a loose object lets the compiler catch an unhandled role

### Row level security

- PostgreSQL can enforce the same rule inside the database, so a forgotten `where` clause returns nothing rather than everything

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY seller_isolation ON orders
  USING (seller_id = current_setting('app.seller_id'));
```

- Stronger, because application code cannot bypass it. MongoDB has no equivalent, so there isolation is convention

### Policy engines

- **OPA**, **Cedar** and **Casbin** move rules into a policy language outside the application
- Worth it when rules change often, when non-engineers need to read them, or when several services must agree on one set
