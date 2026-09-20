## Backward, forward, full

- Two versions of the schema, two directions of reading. The words are fixed; the deploy order follows from them

| Compatibility | Who reads what | Safe changes | Deploy order |
|---|---|---|---|
| **Backward** | New reader, old data | Add a field with a default; delete a field | Consumers first |
| **Forward** | Old reader, new data | Add a field; delete a field that had a default | Producers first |
| **Full** | Both | Add or delete fields with defaults only | Any order |

- Confluent Schema Registry's default mode is `BACKWARD`: the new schema must read data written under the previous one, so consumers upgrade first. `_TRANSITIVE` variants check against every earlier version, not just the last
- The rows-on-disk case is backward compatibility with a database as the writer: new code must read every row ever written

### The failure

- The producer deployed first under `BACKWARD`. The mode only promised that new consumers read old data. Old consumers now see a schema they were never checked against, and if it added a field they lack a default for, they fail on every message until the consumer deploy lands
- A rename in Avro is a delete plus an add: the old readers lose a field, the new readers gain one with no data. Do it as two changes, both with defaults, or use Avro's `aliases`
