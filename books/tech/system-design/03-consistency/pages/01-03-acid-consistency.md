## Consistency is your invariant

- The C in ACID stands for Consistency. It is the most misunderstood letter in the acronym. Unlike Atomicity, Isolation, and Durability, Consistency is not a guarantee provided by the database
- **Consistency is an application property**. It simply means that your data must always obey your business rules (invariants). For example, "credits and debits across all accounts must always sum to exactly zero"

| Invariant | Who enforces it | How it breaks |
|---|---|---|
| A user's `email` must be unique | Database (via `UNIQUE` constraint) | Two concurrent inserts without a constraint. |
| A row in `orders` must point to a real `users` row | Database (via `FOREIGN KEY`) | The user is deleted without `CASCADE`. |
| Account balances cannot be negative | Database (via `CHECK (balance >= 0)`) | A concurrent withdrawal bypasses the check. |
| **Credits minus debits must equal zero** | **Application code** | A bug in the application's math. |

- The database cannot mathematically prove that your application code is correct. It only provides the tools (Atomicity and Isolation) that allow you to keep the data consistent

### The failure

- Assuming the database magically prevents bad data. You will hear engineers say, "We use Postgres, so our data is ACID compliant and consistent." 
- If your application code has a bug that accidentally credits Bob $100 without debiting Alice, the database will happily commit the transaction. The transaction was Atomic and Isolated, but the state of the system is now mathematically inconsistent. The database only enforces what you explicitly declare
