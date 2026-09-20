## The cheapest distributed transaction is none

- Sagas are difficult to design. Compensations are hard to write. Idempotency is hard to get right. Dealing with missing isolation and weird intermediate states is a nightmare
- The absolute best way to solve a distributed transaction problem is to **not have a distributed transaction problem**

:::interview
**The boundary check**
Before you draw a saga on the whiteboard, ask the interviewer: "Do these two pieces of data actually need to live in different services?" Microservices are drawn around domains, not tables. If an Order and its Order Lines are always modified together, they belong in the exact same database. If you split them, you are paying the distributed tax for zero benefit.
:::

- If Service A and Service B constantly need to update data atomically, it is a massive red flag that your service boundaries are drawn incorrectly
- **Merge the databases**: If both services use Postgres, you can often just put both schemas in the exact same physical database cluster. They can still be separate microservices, but they can now use standard `BEGIN` and `COMMIT` across all tables
- **Merge the services**: If the domain logic is tightly coupled, fold Service B into Service A. A monolith with a local transaction is infinitely easier to operate than two microservices coordinating a saga

### The failure

- Splitting an entity, then building a saga to reunite it. The classic mistake is creating an "Order Service" and a "Payment Service" when the business logic strictly dictates that an order cannot exist without a payment. If they are permanently glued together in the business rules, glue them together in the infrastructure
