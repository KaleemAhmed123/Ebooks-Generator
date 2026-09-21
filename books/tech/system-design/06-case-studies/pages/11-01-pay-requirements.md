# Module 11 - Payment system

## Requirements and numbers

- A payment system moves money in from customers, out to merchants, and back on refunds, against a **PSP**, a payment service provider such as Stripe or Adyen that talks to the card networks so the design never has to. The requirement that shapes everything: never lose a cent and never move one twice. Throughput is not the problem; correctness under retries, duplicates and partial failure is
- Functional, in: pay-in at checkout; pay-out to merchants; refunds; a balance and a statement per account. Out: card processing itself, fraud scoring, tax
- Non-functional: every movement recorded exactly once in a ledger that sums to zero; a retry never charges twice; every day's ledger reconciles against the PSP's own record to the cent; latency of seconds is fine
- Inputs, as assumptions: say 1 000 payment requests a second at peak; each payment produces about four ledger movements over its life (authorise, capture, fee, payout); a ledger row of 200 bytes, kept forever

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| ledger rows | 1 000/s × 4 movements × 2 rows | 8 000 rows/s at peak, appended, never updated |
| a day of ledger | 8 000 × 86 400 × 200 B | ≈ 140 GB/day at peak rate; tens of TB a year |
| idempotency keys | 1 000/s × 86 400 s, retained 24 h | ≈ 86 M live keys, each a small row (page 2) |
| reconciliation | one PSP settlement file per day | a batch job, not a stream; discrepancies are a queue for people (page 6) |

- These are small numbers by the standards of Modules 7 to 9, on purpose. The store is relational with transactions (booklet 03), the writes are serialised where they must be, and the design spends its budget on being right, not fast
- What is special: money crosses a boundary the design does not control, the PSP, twice per payment (page 4), and every crossing can be duplicated, delayed or lost. Pages 2, 5 and 6 are the three defences

### The failure

- Designing for throughput. A candidate shards the ledger for a million writes a second and puts balances in a cache, and the interviewer asks what happens when a webhook arrives twice. The requirement was "never double a cent", and nothing on the board addresses it
