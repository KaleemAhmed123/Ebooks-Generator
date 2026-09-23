## Glossary: R–S

| Term | Means | Where |
|---|---|---|
| **row-based replication** | shipping each changed row identified by its key, so replicas may differ in version and in physical layout | 2 · 5-03 |
| **RPO** | recovery point objective: how much data may be lost. Under async replication, exactly the replication lag at the moment of failure | 5 · 12-02 |
| **RTO** | recovery time objective: how long it takes to be serving again | 5 · 12-02 |
| **saga** | a sequence of local transactions, each committing in its own database, with compensations to undo the ones already done | 3 · 4-05 |
| **sample** | one timestamp and one value in a series | 6 · 15-02 |
| **saturation** | how full the service is. The golden signal that predicts the other three | 5 · 6-04 |
| **scatter-gather** | a query that must read every partition, because the value it filters on exists in all of them | 2 · 8-12 |
| **schema-on-read** | structure enforced by the code that reads the document, not by the database | 2 · 1-03 |
| **schema registry** | a service storing every schema version and handing out ids, so the wire carries an id rather than a schema | 2 · 4-07 |
| **schema resolution** | matching a writer's schema to a reader's by field name, at decode time | 2 · 4-05 |
| **semantic lock** | marking a row `pending` so readers treat it as absent while a saga is in flight | 3 · 4-07 |
| **semantic undo** | reversing a business effect with a new transaction, rather than restoring the old bytes | 3 · 4-06 |
| **semi-synchronous** | waiting for at least one replica to have received and flushed the event, though not applied it | 2 · 5-05 |
