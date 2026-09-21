## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| the PSP is slow or down | retries with exponential backoff and jitter, `2^n` plus a random offset, which is the pattern Stripe's own 2017 idempotency post recommends so that a recovering PSP is not hit by every client at once; the idempotency key (page 2) makes every retry safe. A breaker (Module 5, page 5) stops the storm at the source |
| "order shipped" and "payment captured" must agree | the outbox (booklet 04): the transition, the ledger rows and the event row are one transaction, and a relay publishes the event afterwards. Publishing to the broker first and then committing is the failure below |
| PCI scope | the card number, the **PAN**, never reaches the design's servers or logs: the browser sends it to the PSP (page 4), and the design stores the PSP's token. Scope is decided by where the PAN travels, not by encryption after the fact |
| multi-currency | the ledger row carries the currency, and a posting is single-currency (page 3); a conversion is two postings through an FX account with the rate stored on the rows. Recomputing a historical balance with today's rate is the bug the auditor finds |
| the balance page is slow | the balance is a cached sum, updated by the same transaction that inserts the rows, or rebuilt from the ledger by a read model (booklet 04). The ledger stays append-only; the cache is disposable |
| refunds and chargebacks | new postings in reverse (page 3) through a transition on the state machine (page 5); a chargeback arrives as a webhook like any other event, months later, and the row's state decides what it may do |

- The metric: unreconciled amount at the end of each day, which should be zero, and the age of the oldest item in the discrepancy queue. Latency is reported, not optimised
- Cross-references the design leans on: idempotency and backoff (booklet 01); transactions and the row lock (booklet 03); outbox, queues and read models (booklet 04); the breaker (Module 5, page 5)

### The failure

- Publishing the event before the commit. The handler sends "payment captured" to the broker, then the transaction fails; a warehouse ships against a payment that was never captured, and no reconciliation catches it because the ledger is right. The event and the row leave in one transaction or the event does not leave
