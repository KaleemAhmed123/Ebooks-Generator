## Event Sourcing vs CRUD

- Is Event Sourcing better than CRUD? No. It is a completely different paradigm designed for a specific set of problems.

| | CRUD | Event Sourcing |
|---|---|---|
| **Storage** | Stores the current state. | Stores the journey. |
| **Auditing** | Difficult. Requires separate audit tables or triggers. | Perfect. The application state *is* the audit log. |
| **Time Travel** | Impossible. | Native. Just replay the log up to a specific timestamp. |
| **Complexity** | Low. Standard SQL queries. | Extremely high. Requires CQRS and async read models. |
| **Bug Fixing** | Write a script to update the bad data. | Write a script to append new compensating events. |

- Event sourcing gives you incredible power for systems where the history is legally or financially important (Accounting, Shopping Carts, Healthcare). 

### The failure

- Using event sourcing where the journey doesn't matter. A junior developer reads a blog post about Event Sourcing and decides to use it for a simple Blog CMS. When a user edits a typo in an article, an `ArticleTypoCorrected` event is generated. No one cares about the typo. No one will ever "time travel" to see the article with the typo. The developer has introduced massive architectural complexity (CQRS, eventual consistency) for zero business value. If the journey doesn't matter, just use CRUD
