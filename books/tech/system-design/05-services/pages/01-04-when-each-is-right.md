## The workload decides

- Monolith or microservices is a decision table, not a preference: the rows are facts about the team and the workload, and the answer changes as they do

| Constraint | Monolith fits when | Microservices fit when |
| :--- | :--- | :--- |
| **teams** | one or a few; one release calendar | several, with colliding calendars; each must ship alone (page 3) |
| **scaling** | everything scales together, affordably | one part needs 50 CPUs while the rest idles |
| **data store** | one relational store serves all | one part needs a graph or a time series (booklet 02) |
| **failure domain** | one crash takes all, acceptably | one part's leak must not take payments (Module 4) |
| **understanding** | the domain is still being learned | the seams are known from running it (Module 2) |

- Fowler's MonolithFirst (2015) is the last row measured: almost all the successful microservice stories started with a monolith that got too big and was broken up; almost all built as microservices from scratch ended in serious trouble, because the premium is paid before the product is proven and refactoring across services is much harder

:::interview
"Monolith or microservices for this?" — Neither by default; the table. For a new product with one team, a modular monolith: boundaries in the compiler, one transaction, one deploy, and extraction is mechanical later. Split when a row flips: two teams blocked on one release train, one component with its own scaling curve, or a failure that must be contained.
:::

### The failure

- Splitting before the domain is understood. The boundaries are guessed and wrong, and a refactor that would be a rename in one codebase is a contract change across a network with two deploys and a migration. The monolith is the cheap place to be wrong
