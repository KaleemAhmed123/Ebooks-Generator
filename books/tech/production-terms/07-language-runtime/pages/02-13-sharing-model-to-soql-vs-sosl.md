## Sharing Model

*with/without sharing*

Apex runs in system context by default and ignores record sharing rules. The
class has to say `with sharing` for them to apply.

A controller declared `without sharing` returns records the running user has no
right to see. Nothing throws, the page renders, and no test catches it — tests
run as an admin unless someone deliberately wrapped them in `System.runAs`.

| Declaration | Behaviour |
|---|---|
| `with sharing` | record sharing rules enforced |
| `without sharing` | system context — sees everything |
| `inherited sharing` | takes the caller's context; safe default for utilities |

Omitting the keyword entirely is not neutral. An unannotated class behaves as
`without sharing` when it is the entry point.

## SOQL vs SOSL

SOQL queries one object and its relationships with precise filters. SOSL runs a
full-text search across several objects at once and returns a list per object.

| | Shape | Use when |
|---|---|---|
| SOQL | `SELECT ... FROM Account WHERE ...` | you know the object and the filter |
| SOSL | `FIND 'Acme' IN ALL FIELDS RETURNING Account, Contact, Case` | you know the text, not the object |

"All open opportunities for account X" is SOQL. "Everything mentioning Acme,
wherever it lives" is SOSL. They count against separate governor limits, and
SOSL only sees fields the search index covers — which is why a record saved
seconds ago can be missing from the result.
