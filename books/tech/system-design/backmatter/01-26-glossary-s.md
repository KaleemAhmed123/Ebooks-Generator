## Glossary: S

| Term | Means | Where |
|---|---|---|
| **spider trap** | a site that generates pages without end, such as a calendar with a next-month link forever | 6 · 14-05 |
| **split brain** | two nodes each believing it is the leader | 1 · 7-04 |
| **split vote** | an election in which two candidates each fall short of a majority | 3 · 7-04 |
| **SSI** | Postgres's Serializable: snapshot isolation plus bookkeeping of what each transaction read and wrote, aborting those that would break serializability | 3 · 3-07 |
| **SSTable** | a sorted, immutable file with a sparse in-memory index, so a lookup seeks once and scans one block | 2 · 2-07 |
| **stateful** | holding data no other process has, so killing it loses that data until it recovers | 1 · 3-03 |
| **stateless** | replaceable without anyone noticing | 1 · 3-03 |
| **statement-based replication** | shipping the SQL text, which breaks on anything each replica evaluates for itself | 2 · 5-03 |
| **static membership** | telling the group coordinator that a restarted pod is the same member, so a quick restart keeps its partitions | 4 · 3-05 |
| **steady state** | a measurable definition of "working", stated before an experiment begins | 5 · 4-11 |
| **stickiness** | routing a session to one replica, or carrying a version token, so a reader never falls behind itself | 3 · 5-08 |
| **sticky available** | a client keeps working through a partition, as long as it stays on the same replica | 3 · 5-07 |
| **STONITH** | cutting a node's power or network before promoting its replacement | 2 · 5-07 |
