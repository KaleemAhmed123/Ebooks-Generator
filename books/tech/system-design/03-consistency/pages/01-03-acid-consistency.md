## Consistency is your invariant

- The C in ACID is not a database guarantee. **Consistency** here means the data obeys your rules: every order points at a customer, credits and debits sum to zero, no seat is sold twice
- The database enforces only the rules you declare as constraints. The rest is application code, and atomicity and isolation are the tools it uses to keep a rule true across a crash or a concurrent writer

| Invariant | Who enforces it | How it still breaks |
|---|---|---|
| `email` is unique | database, `UNIQUE` | it does not; two inserts race and one fails |
| every order has a customer | database, `FOREIGN KEY` | a bulk load run with constraints off |
| balance never below zero | database, `CHECK (balance >= 0)` | the app reads 100, computes 40, writes 40; so does a second app; the check passes twice (lost update, Module 2) |
| **credits and debits sum to zero** | **application code** | one code path credits without debiting; the database commits it |

- "We use Postgres, so the data is consistent" claims the last row from the first three. Only what is declared is checked

### The failure

- An invariant that lives in a comment. Two services each believe the other checks that a booking has a paid invoice; neither does. Write the rule as a constraint where the database can hold it. Where it cannot, name the one code path that owns it
