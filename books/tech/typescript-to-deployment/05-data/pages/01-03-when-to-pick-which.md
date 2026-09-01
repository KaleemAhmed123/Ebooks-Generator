## Picking one

| Choose PostgreSQL when | Choose MongoDB when |
|---|---|
| the data has many-to-many relationships | records are read whole and rarely joined |
| correctness matters more than write throughput | the shape genuinely varies per record |
| you need reporting, aggregates and ad-hoc queries | you need horizontal write scaling |
| several services read the same tables | one service owns the collection |
| the schema is stable and understood | the schema is still being discovered |

### The honest positions

- **PostgreSQL is the better default.** It is the answer when nobody has a specific reason to say otherwise
- It stores JSON, does full text search, handles geospatial data and vectors, and its constraints stop bad data at the door
- **MongoDB earns its place when the shape is genuinely open.** A seller defining their own product fields is a real document problem, and modelling it relationally means an entity-attribute-value table nobody enjoys
- "It scales better" is usually not the reason. Most services never reach the point where a single Postgres instance is the limit

### Using both

- Running two databases is a real operational cost: two backup stories, two failover plans, two sets of knowledge
- It is justified when one part of the system is genuinely document shaped and the rest is not
- It is not justified because one service was written by someone who preferred the other
