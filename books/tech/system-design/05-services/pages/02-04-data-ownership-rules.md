## Who may write what

- The **single-writer principle**: for every piece of data, exactly one service may change it, and that service is the source of truth. Everyone else holds an id, or a copy they know is a copy (page 6). Across a boundary, a relationship is a string, never an object and never a foreign key

```typescript
// orders context: reference identity's customer by id, never by shape
type Order = {
  id: string;
  customerId: string;           // an id into identity's context, checked nowhere here
  customerEmail?: string;       // a copy, stamped at order time, refreshed by event
  total: Money;
};
// ✕ type Order = { customer: Customer }  — imports identity's model into orders,
//   so every change to Customer is a change to Order's schema and deploy
```

- `customerId` is a promise that identity once issued that id, not a guarantee that it still resolves. The database cannot check it, because the row lives in another database, and the application must not check it on every write, because that turns every order into a synchronous call on identity (the failure below). An order for a customer identity has since deleted is a valid order with a dangling reference, handled when it is read, not refused when it is written
- The copied field, `customerEmail`, is the other half of the rule: a snapshot taken at write time, kept fresh by identity's events, and never edited here. The receipt goes to the email the order was placed with, which is often the correct behaviour anyway
- Referential integrity moves from the database to the contract: identity promises ids are never reused, orders promises to tolerate an id that no longer resolves, and both promise to publish the events the other keeps its copies from (Module 5)

### The failure

- Cross-service foreign keys enforced by nothing, or worse, by a call. A `FOREIGN KEY` to another service's table is impossible once the databases are separate, so the check is moved into code: `GET /users/{id}` before every `INSERT INTO orders`. Now identity is on the critical path of every order, its p99 is added to checkout's, and its outage is checkout's outage (Module 4). The reference is a string precisely so that the write needs nobody else
