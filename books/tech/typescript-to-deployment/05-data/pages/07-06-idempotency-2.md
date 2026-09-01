## Idempotency - continued

- **The check, the work and the record must be one transaction.** Split them and two concurrent deliveries both see no record and both credit the wallet
- The unique constraint on `processedEvent.id` is what makes it safe even then. The second insert fails and rolls its transaction back

### Where the key comes from

- A payment provider gives you an event id. Use theirs
- A client calling your API should send an `Idempotency-Key` header, and you store it against the response
- Never generate the key yourself on receipt. A retry would generate a different one, which defeats the whole thing
