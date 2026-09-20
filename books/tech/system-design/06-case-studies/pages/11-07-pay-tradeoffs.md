## What the interviewer probes

- **Retries:** When calling the PSP, use exponential backoff with jitter (→01). A retry storm of payments can result in thousands of dollars in authorization fees
- **PCI compliance:** Never store the Primary Account Number (PAN). Use PSP tokenization (Elements/Elements.js) to keep your servers entirely out of PCI scope
- **Multi-currency:** If the interviewer mentions FX (foreign exchange), the ledger must store the original currency, the target currency, and the exact exchange rate used at the microsecond of the transaction. Never recalculate FX at read time

### The failure

- Writing a SQL query to sum the ledger rows every time a user views their dashboard. It will take minutes for an old account. Use CQRS (→04) to maintain a fast read-optimised balance cache, rebuilt from the ledger

:::interview
A user views their account balance. You run `SELECT SUM(amount) FROM ledger WHERE user = 123`. It times out. How do you optimise reads without breaking the append-only ledger?

Create a separate balance table that caches the current sum. When a ledger row is inserted, emit an event (CQRS) to update the balance table. The dashboard reads the fast balance table.
:::\n