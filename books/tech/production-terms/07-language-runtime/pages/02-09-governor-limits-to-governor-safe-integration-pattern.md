## Governor Limits

Hard per-transaction caps Salesforce enforces because the platform is
multi-tenant. Crossing one throws a `LimitException` that cannot be caught, and
the whole transaction rolls back.

| Per synchronous transaction | Cap |
|---|---|
| SOQL queries | 100 |
| DML statements | 150 |
| Records retrieved | 50,000 |
| CPU time | 10 seconds |

A single query inside a loop over a 200-record batch spends 200 of a budget of
100. The record that crosses the line is not the record with the problem, and
the 199 valid ones roll back with it. Async contexts get roughly double.

## Governor-Safe Integration Pattern

Calling an external system from Salesforce inside the limits: 100 callouts and
120 seconds of total callout time per transaction, and one rule that catches
everyone — a callout cannot follow uncommitted DML in the same transaction.

A trigger that writes a record and then calls an API throws "You have
uncommitted work pending". The database is holding an open transaction and
Salesforce will not let you wait on a third party while it does.

The fix is to end the transaction first. Publish a platform event, or enqueue a
Queueable, and make the callout in the fresh transaction that follows.
