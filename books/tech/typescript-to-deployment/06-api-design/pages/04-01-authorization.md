# Module 4 - Authorization

## Deciding what a caller may do

- Authentication ends with a known identity. Authorization starts there and asks whether this identity may do this thing to this record
- The gap between those two questions is where the most damaging API bugs live, because both requests are authenticated and one is a breach
- Three models, in increasing order of what they can express
- **RBAC**, role-based. A user has roles, roles have permissions. Simple, and it cannot express ownership
- **ABAC**, attribute-based. Rules over attributes of the user, the resource and the context. Expresses ownership, region and time of day
- **ReBAC**, relationship-based. Permissions follow a graph of relationships. This document is in a folder shared with a team you belong to

### Where each stops being enough

- RBAC answers is this user a seller. It cannot answer is this **their** order
- That second question needs the row, which is why it can never live in middleware
- Most systems are RBAC for the coarse check plus a hand-written ownership check, and that is a reasonable place to stay

### The rule that prevents most of it

- **Authorize on the object, not on the route.** Loading the record and comparing its owner is the check that actually holds
- A route-level role check is a filter, not a boundary
