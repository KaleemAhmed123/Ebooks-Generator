# Payment System

### Requirements and numbers

- Payment systems (Stripe, PayPal) move money. The architecture is defined by one absolute rule: never lose money, and never double-charge
- **In scope:** Pay-in (checkout), pay-out (to merchants), reconciliation
- **Out of scope:** The internal bank networks (Visa/Mastercard integration)

| Metric | Requirement |
|---|---|
| **Consistency** | 100% Strong Consistency (→03). Exact math |
| **Availability** | AP is unacceptable. CP system required |
| **Throughput** | Relatively low. Accuracy > Latency |

- Do not design a payment system for millions of QPS. A busy payment gateway might do 1,000 QPS. Throughput is completely irrelevant if a race condition double-charges a customer. You will use relational databases and strict locks

### The failure

- Using a NoSQL eventually consistent datastore (Cassandra) to store balances. You cannot resolve conflicts on a bank balance by merging timestamps. You need ACID transactions (Postgres/MySQL)

:::interview
You designed a payment ledger using Cassandra to handle 10,000 QPS. The interviewer looks horrified. Why?

Because Cassandra provides eventual consistency. If two transactions hit different replicas simultaneously, the balance can be incorrectly overwritten. Payments require strict ACID transactions and serializability.
:::\n