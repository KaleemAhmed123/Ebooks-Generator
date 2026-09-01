## Multi-tenancy

- One deployment serving many customers who must never see each other's data
- The isolation decision is made once, early, and is expensive to reverse

| Model | Isolation | Cost |
|---|---|---|
| Shared tables, `tenant_id` column | weakest, one missing filter leaks everything | cheapest to run |
| Schema per tenant | strong, one schema each | migrations multiply |
| Database per tenant | strongest | expensive past a few hundred tenants |

- Most products start with a `tenant_id` column and stay there, which is fine **if** the filter cannot be forgotten

### Making it hard to forget

- Resolve the tenant once, at the edge, from the subdomain or the token
- Put it in `AsyncLocalStorage` so it is available everywhere without threading it through signatures
- Apply it in one repository layer that every query goes through, never in individual handlers
- Enable row level security so the database refuses even if the application forgets

### The three that leak

- **Background jobs.** A worker has no request, so the tenant must be carried on the job payload
- **Caches.** A cache key without the tenant serves one customer another customer's data
- **Exports and reports.** Usually written later, by someone else, against a raw query with no scope
