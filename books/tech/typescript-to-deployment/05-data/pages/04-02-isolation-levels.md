## Isolation levels

- Isolation is the expensive guarantee. Making every transaction behave as if it ran alone means blocking others, and blocking costs throughput
- So databases offer **levels**, each allowing a specific anomaly in exchange for speed
- Knowing the anomalies matters more than knowing the level names, because the anomaly is what shows up as a bug

| Anomaly | What happens |
|---|---|
| **Dirty read** | you read a value another transaction has not committed, and may roll back |
| **Non-repeatable read** | you read the same row twice and get different values |
| **Phantom read** | you run the same query twice and get different rows |
| **Lost update** | two transactions read, both write, and one write disappears |

| Level | Dirty | Non-repeatable | Phantom |
|---|---|---|---|
| Read uncommitted | possible | possible | possible |
| **Read committed** | no | possible | possible |
| Repeatable read | no | no | possible |
| Serializable | no | no | no |

### What you actually get

- **PostgreSQL defaults to Read committed**, and never allows dirty reads at any level
- **MySQL defaults to Repeatable read**
- **MongoDB** transactions behave close to snapshot isolation

### The one that bites

- **Lost update** is not in the table because Read committed permits it and it looks like nothing went wrong
- Two payouts read a balance of 500, both check it is enough, both subtract 400, and the wallet ends at 100 having paid out 800
- No error is raised. The money is simply gone, and the next page is about why
