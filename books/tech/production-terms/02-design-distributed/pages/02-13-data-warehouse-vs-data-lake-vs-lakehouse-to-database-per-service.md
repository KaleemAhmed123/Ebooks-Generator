## Data Warehouse vs Data Lake vs Lakehouse

Three answers to where analytical data lives, separated by when the schema is
applied.

| | Stores | Schema applied | Trade |
|---|---|---|---|
| Lake | raw files, any shape | on read | cheap; ungoverned it becomes a swamp |
| Warehouse | modelled tables | on write | fast and queryable, rigid to change |
| Lakehouse | lake storage, ACID table format | on write, over lake files | warehouse semantics at lake cost |

A lake with no catalog and no schema enforcement is where data goes to be
forgotten. Table formats — Iceberg, Delta, Hudi — are the part that prevents
that, and are what make the lakehouse a real category rather than a marketing
one.

## Database per Service

Each service owns its schema, and no other service reads it directly. This is
the boundary that makes microservices real rather than a monolith with network
calls in the middle.

Two services sharing a table means neither can change its schema alone. You have
paid the full operational cost of microservices and kept the coupling that made
the monolith hard to change, which is the worst of the available positions.

The cost is real and worth stating plainly: no joins across services, and
consistency between them becomes eventual. If that cost is unacceptable for a
particular pair of services, they are one service.
