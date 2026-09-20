## The cheapest distributed transaction is none

- Every page of this module is the cost of two databases where one would do. Before paying it, ask whether the rows really belong apart. Service boundaries follow the domain; if two things change together on every business action, they are one domain

:::interview
"How would you make creating the order and taking the payment atomic across the two services?" — First, why are they two services? If an order cannot exist unpaid, put both tables in one database and use one transaction. If they must be separate, the payment service is the pivot: reserve, then charge, then confirm, with the order pending until the charge succeeds, and idempotency keys on every step.
:::

- Two ways to avoid the saga. Put both schemas in one database (one Postgres database, not merely one cluster: a transaction spans schemas, not databases) so `BEGIN` and `COMMIT` cover both. Or give the two writes one owner: the service that owns the invariant makes both changes and the other reads them
- The decision is reversible in one direction only. Merging two services into one database is a migration; splitting a transaction into a saga is this whole module, forever

### The failure

- `orders` and `order_lines` in two services, joined back together by a saga. Nothing in the business ever touches one without the other, so every write is now a workflow with compensations, and every read a stale join. The boundary was drawn around a table, not a domain
