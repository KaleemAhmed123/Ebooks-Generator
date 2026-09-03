## Quota & Metering

Counting per-tenant usage for two different purposes at once: enforcing a limit
in the request path, and producing a number accurate enough to invoice.

Counting in process gives the wrong total the moment there is a second replica.
Counting synchronously in the database adds a write to every request. The usual
compromise is a Redis counter on the hot path, flushed periodically into durable
storage, which is fast and approximate where it needs to be fast, and exact
where the money is.

Three questions have to be answered before writing any of it: is the limit hard
or soft, is overage billed or blocked, and what happens when the counter store
is unavailable. Failing open costs money; failing closed costs an outage.

## RBAC vs ABAC

Role-based access control grants permissions to named roles. Attribute-based
evaluates a policy over attributes of the user, the resource and the context.
RBAC is simpler right up until the roles multiply.

"Managers can approve expenses under ₹50,000, in their own department, during
business hours" is one ABAC policy. As RBAC it is a role per department per
threshold, and the list grows every time someone asks a reasonable question.

The cost of ABAC is auditability. With roles, "who can access this?" is a
lookup. With policies it becomes a search problem, and answering it for a
compliance review means evaluating the policy against every user.

## Read Replica Routing

Sending reads to replicas to scale read capacity, while accepting that replicas
lag. Which reads are allowed to be stale is a product decision, not an
infrastructure one.

Dashboards, list views and search can serve from a replica; nobody notices three
hundred milliseconds. Anything a user reads immediately after writing it must go
to the primary, or their own change appears to have failed.

Route by what the query is for, not by current load. Load-based routing sends
exactly the wrong query to the replica at exactly the wrong moment, because the
moment of high load is the moment of high lag.
