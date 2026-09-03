## Exhaustiveness Check

*never*

Assigning the switched value to a variable typed `never` in the default branch.
Every union member is handled, so nothing reaches the default, so the assignment
compiles. Add a member and it stops compiling.

Add a `cancelled` order status and twelve switch statements fail to build at
once. Without the check, those twelve statements fall through to whatever the
default happened to do — usually rendering nothing, in silence.

The value is the blast radius, not the branch. It converts "find every place
that handles a status" from a grep into a build error, and grep misses the
places that spell it differently.

## Field-Level Security & CRUD Checks

Sharing decides which records a user can see. Field-level security decides which
fields, and which operations. Apex enforces neither by default — the query runs
in system context and returns everything.

A user with no access to `Salary__c` sees it in a custom Lightning component,
because the Apex controller read it and handed it over. Nothing threw. The page
just showed a number it should never have had.

| Enforce with | Effect |
|---|---|
| `WITH USER_MODE` on the SOQL | applies FLS and sharing to the query |
| `Security.stripInaccessible(...)` | removes fields the user cannot read |
| `Schema.sObjectType.X.isAccessible()` | explicit per-object or per-field check |

`WITH SECURITY_ENFORCED` throws on the first inaccessible field. `USER_MODE` is
the newer and generally better option, because it covers sharing too.
