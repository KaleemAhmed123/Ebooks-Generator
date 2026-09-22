## How big is a service

- As big as its consistency boundary, as small as one team can own. Both limits are about behaviour, not lines of code: the lower bound is set by the writes that must be atomic (page 7), the upper by the people who carry the pager and the roadmap (Module 1, page 6)
- The lower bound first. Everything that must change in one transaction is in one service, whatever that makes its size; a service split below that line needs a saga for an ordinary write, which is the sign the cut was wrong. Two tables that are always written together are one service's tables
- The upper bound second. A service is one team's: its code, its schema, its deploy, its alerts. The "two-pizza" number is a statement about ownership capacity, a team small enough to decide over lunch, not a target for code size. One team may own several services; one service may not be owned by several teams

- Within those bounds, the size is set by change: a part that ships on a different rhythm, scales on a different curve, or fails in a way that must be contained is the part that becomes its own service (Module 1, page 4). A part that changes with everything else stays inside
- The count that matters is deploys per feature. One feature, one deploy is the goal; one feature, six deploys in a fixed order is the failure below, and the fix is a merge, which is always cheaper than the split was

### The failure

- Nano-services. Forty functions, each its own HTTP service, most wrapping one table; one feature is six deploys in the right order, a checkout is a trace across nine hops, and every service is too small to hold a rule, so the rules live in the callers. It is the noun split (page 2) taken to its limit: all of the distributed-systems tax (Module 1, page 5), none of the independence, and a merge is the only way out
