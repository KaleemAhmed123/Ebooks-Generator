## The Saga Pattern

- If you cannot use a single SQL database transaction across microservices, how do you handle a checkout flow that requires updating Inventory, Payment, and Shipping?
- You use the **Saga Pattern**. A Saga is a sequence of local database transactions. Service A commits to its database, emits an event, and triggers Service B. 
- If Service C fails, you cannot simply `ROLLBACK`. The data in A and B has already been permanently committed to their respective databases.

| Forward Step (The Saga) | Compensating Action (The Rollback) |
|---|---|
| 1. Create `Order` in DB (Status: PENDING) | 1. Update `Order` to CANCELLED. |
| 2. Reserve 1x Laptop in `Inventory` DB | 2. Add 1x Laptop back to `Inventory`. |
| 3. Charge $1000 in `Payment` DB | 3. Issue a $1000 Refund to the API. |
| 4. Generate Shipping Label | 4. Cancel the label with FedEx. |

- A Saga works by explicitly defining a **Compensating Action** for every single forward step. If step 4 fails, the system must execute the compensation for step 3, then step 2, then step 1.

### The failure

- Attempting a Saga without defining compensating actions. A developer builds a microservice flow but forgets to implement the rollback paths. The system works perfectly on the happy path. But when FedEx's API goes down during step 4, the order fails. The user's credit card has already been charged $1000 in step 3. Because there is no automated refund compensation, the user loses their money, and customer support is flooded with angry calls. If you build a Saga, you must build the undo button for every step
