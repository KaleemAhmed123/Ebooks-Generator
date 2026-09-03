## Multi-Region Architecture

Running in more than one region, for latency or for survivability. The compute
is never the hard part.

Stateless services in three regions is a weekend's work. What takes the quarter
is deciding what happens to writes when the regions cannot reach each other, and
that question has no default answer.

Four things have to be settled before any of it is built: where writes go, how
conflicts are resolved, how much data you accept losing on failover, and what
the law requires about where the data sits. Every one of those is a product or
legal decision wearing a technical costume.

## Multi-Tenancy Models

Whether tenants share infrastructure, and how much. Three positions, and the
right one usually differs per customer tier.

| | Isolation | Cost | The failure mode |
|---|---|---|---|
| Pool — shared tables, `tenant_id` | weakest | cheapest | one missing `WHERE` leaks data |
| Bridge — shared cluster, schema per tenant | structural | moderate | migrations across 4,000 schemas |
| Silo — separate stack per tenant | strongest | highest | you now operate N systems |

Pooled tenancy puts the whole isolation guarantee in application code, which
means every query is a potential breach. The bridge model makes leakage
structurally harder and makes schema changes genuinely painful. Enterprise
customers frequently buy the silo outright, which turns the cost into revenue.

## Noisy Neighbour

One tenant's load degrading every other tenant's experience on shared
infrastructure.

A single customer starts a bulk import, consumes the entire connection pool, and
every other tenant sees timeouts on unrelated work. Nothing is broken and
nothing alerts, because from the infrastructure's point of view it is simply
busy.

Containment is per-tenant quotas, separate queues for bulk work, and fair
scheduling rather than first-come-first-served. The largest accounts often end
up with dedicated capacity, which is the honest version of the same fix.
