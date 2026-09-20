## Efficiency locks and correctness locks

- Kleppmann's split, and the first question to ask of any lock. An **efficiency lock** avoids doing the same work twice: two nodes both rebuilding a cache is waste, not damage. A **correctness lock** prevents two writers where a second writer breaks an invariant: two nodes both charging the card is damage

| | Efficiency lock | Correctness lock |
|---|---|---|
| cost of two holders | a duplicate job; wasted CPU; a duplicate email at worst | corrupted data, double payment, a lost write |
| acceptable failure rate | rare double-holding is fine | zero; the whole point is "never two" |
| what it needs | a lease from anything convenient | a lease **and** a fencing token the resource checks |
| good enough | a single Redis instance (page 7); a database row with a TTL | a consensus store (page 9), or no lock at all (page 10) |
| examples | cron de-duplication, cache warm-up, "only one node polls this feed" | leader for a partition, single writer to a ledger, migration runner |

- The classification is about the operation, not the tool. The same Redis key is an efficiency lock around a report generator and a correctness bug around a payment. Decide which by asking what a second holder does, not by asking how many nodes the lock has
- Most locks in a codebase are efficiency locks, and for those the cheapest lease is right. The mistake is promotion: a lock written for de-duplication gets reused around a write that matters

### The failure

- Building a correctness lock on a tool built for efficiency. The tool works within its design (rare double-holding under pauses and failovers); the operation cannot afford the design. The fix is not a better version of the same tool. It is a token the storage checks, or a design that needs no lock
