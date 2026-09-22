## What one hop costs

- Turning a function call into a network call changes five things at once, and none of them shows up in the happy path. The eight fallacies of distributed computing list them; four bite every service on day one: the network is not reliable, latency is not zero, bandwidth is not infinite, topology changes

| Cost | Function call | Network call |
| :--- | :--- | :--- |
| **latency** | nanoseconds | a data-centre round trip is hundreds of microseconds to a millisecond before any work; a cross-region one is tens of milliseconds (booklet 01's latency table) |
| **failure** | it returned or it threw | three outcomes: it never arrived, it ran and the reply was lost, it ran and failed. The caller cannot tell the second from the first, which is why retries need idempotency (booklet 01) |
| **serialisation** | a pointer | encode, copy, decode on both sides; a schema that both sides must agree on (booklet 02, Module 5) |
| **versioning** | the compiler checks caller and callee together | they deploy at different times; the caller may send v1 to a callee expecting v2, forever, unless the contract is managed (Module 5) |
| **observability** | one stack trace | a trace id carried on every hop, or the failure is invisible (Module 6) |

- The costs multiply along a chain. Three hops in series, each with a 1-in-100 chance of exceeding its own p99: the chance that the whole request exceeds it is 1 − 0.99³ ≈ 3 %. The chain's p97 is the hop's p99, and a fan-out of a hundred makes that far worse (Module 3, page 4)
- Availability multiplies the same way: five services at 99.9 % in series are 0.999⁵ ≈ 99.5 % together, four hours a month of downtime instead of forty minutes (Module 3, page 3). Every hop added to the critical path is a term in that product

### The failure

- A synchronous chain of three where one would do. Each hop was reasonable on its own; together they turned a 99.9 % system into a 99.7 % one and doubled the tail. The question at every hop is "can the caller proceed without this answer" (Module 3, page 1), and when it can, the hop leaves the critical path
