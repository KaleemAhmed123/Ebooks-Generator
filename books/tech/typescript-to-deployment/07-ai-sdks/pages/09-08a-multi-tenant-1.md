## Multi-tenant AI features

- Every AI feature in a business product is shared by tenants who must never see each other's data, and who consume a resource billed by usage
- **Both of those are unusual enough to need naming.** A normal API endpoint has neither problem in this shape

### The isolation checklist

| Place | Rule |
|---|---|
| retrieval | tenant id in the `WHERE` clause, before ranking |
| tools | tenant from the session, never from an argument |
| caches | tenant id in every cache key |
| memory files | one directory or prefix per tenant |
| evaluations | never copy real tenant data into a shared set |
| prompt caching | shared prefixes must contain no tenant data |

- **The prompt cache one is subtle.** Putting a tenant's document above the cache breakpoint is fine, and putting it in a prefix shared across tenants is a leak
