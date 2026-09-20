## The rules of evolution

- Evolving an API or event schema safely requires following mechanical rules. In modern Protobuf (Editions 2023+), field presence is `IMPLICIT` by default. There are no explicit default values sent on the wire, making evolution heavily dependent on your application code
- The cardinal rule for relational databases (like Postgres or MySQL) is the same: never change the physical shape of data in a way that breaks running code

| Change | Rule | Consequence |
|---|---|---|
| **Add a field** | Must be optional (or have a default). | Old code reading new data ignores it. New code reading old data uses the default. |
| **Remove a field** | Must have been optional. | Old code reading new data assumes it was omitted. New code ignores it. |
| **Rename a field** | **Banned.** | JSON: breaks completely. Protobuf: technically safe on the wire, but breaks JSON gateways and client code. DB: breaks `SELECT *`. |
| **Change a type** | **Banned.** (e.g., int to string) | Parsers crash immediately. |

### The failure

- Changing a Postgres column type from `integer` to `bigint` in production. Postgres requires an exclusive lock (`AccessExclusiveLock`) on the table to rewrite the entire physical file to accommodate the larger byte size. Every read and write query on that table blocks until the rewrite finishes
- On a 500 GB table, this rewrite can take hours. You have successfully taken down the production database with a single line of SQL
