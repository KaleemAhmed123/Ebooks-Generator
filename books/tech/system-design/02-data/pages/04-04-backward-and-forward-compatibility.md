## Backward and forward compatibility

- In a distributed system, you can never upgrade all nodes at the exact same millisecond. For hours or days, you will have a mix of old code and new code running side-by-side. Your schema must allow them to talk to each other without crashing

| Compatibility | Who is reading what? | Example safe change |
|---|---|---|
| **Backward** | **New** code reading data written by **old** code. | Adding a new field with a default value. When the new code reads old data, it fills in the missing field with the default. |
| **Forward** | **Old** code reading data written by **new** code. | Deleting a field that the old code ignores. (The new code stops sending it, the old code doesn't care). |
| **Full** | Both of the above. Old and new code can read each other's data seamlessly. | Changing an optional field's name, or adding an optional field. |

- In Kafka, you enforce these guarantees via the Schema Registry's compatibility mode. `BACKWARD` is the default (meaning consumers must be upgraded first). `FORWARD` means producers must be upgraded first

### The failure

- Attempting to rename a required field. Old readers looking for the old name will crash when reading the new writer's payload. New readers looking for the new name will crash when reading the old writer's payload
- In Protobuf (and Avro), renaming a field is completely broken unless it is handled as a two-phase add-then-delete
