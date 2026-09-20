## Conway's law as a design input

- Melvin Conway stated in 1967: *"Organizations which design systems are constrained to produce designs which are copies of the communication structures of these organizations."*
- If you have four backend teams, you will naturally end up with a four-tier architecture. Conway's Law is not a joke; it is a gravitational force. Software architecture is fundamentally about communication boundaries
- The "Inverse Conway Maneuver" acknowledges this reality. Instead of fighting it, you design the organization to match the architecture you want. If you want independent, loosely coupled microservices, you must create independent, loosely coupled teams

:::interview
**The team drives the architecture**
In an interview, do not say you will split a system into 50 microservices for a team of 3 engineers. The operational overhead will crush them. Align the system boundaries with the team structure.
:::

### The failure

- The failure mode is a mismatch between code boundaries and human boundaries. The worst case is a single service owned by three different teams
- When three teams deploy the same service, every release is a negotiation. Priorities clash, bugs are untriable, and the service becomes a bottleneck. Code boundaries must map 1:1 with team ownership
