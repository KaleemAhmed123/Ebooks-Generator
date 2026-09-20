## Merge, or abort the loser

- If dropping a write is not acceptable, two options remain: merge the two, or refuse one at write time

| Option | How | Example | You pay |
|---|---|---|---|
| **Merge in the app** | Keep both versions, hand them to code that knows the domain | A cart: union of the items. A counter: sum of the deltas. Text: an operational merge | The merge function, and a definition of "correct" for every conflicting field |
| **Merge by type** | Store data in types that merge themselves | Counters, sets, registers (next page) | Only some data has such a type |
| **Abort the loser** | Detect the conflict after commit, roll back one side | MySQL Group Replication multi-primary: optimistic commit, later rollback | A commit the user already saw as success |
| **Refuse at write time** | Coordinate across regions before acknowledging | DynamoDB multi-region strong consistency: sync to at least one other region, `ReplicatedWriteConflictException` on conflict | Cross-region latency on every write; exactly three regions |

- DynamoDB spells out both ends. The default mode (MREC) replicates asynchronously, "typically within a second", and resolves with LWW. The strong mode (MRSC) has a recovery point objective of zero and rejects the conflicting write instead of merging it
- The choice is per table, not per system. A profile can be LWW; a balance cannot

### The failure

- A rollback the user saw as success. Under optimistic multi-primary, the transaction committed locally, the API returned 200, and a second later the group rolled it back. The manual's advice for multi-primary is what to avoid: `SERIALIZABLE` isolation and cascading foreign keys are unsupported there. If the user must never see a phantom success, refuse at write time and pay the latency
