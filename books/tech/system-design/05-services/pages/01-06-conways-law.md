## Conway's law as a design input

- **Conway's law** (Melvin Conway, "How Do Committees Invent?", 1968), in one line: organisations that design systems are constrained to produce designs that are copies of their communication structures. Four teams that talk through tickets produce four components that talk through queues; two teams that sit together produce one component with two owners
- It is a design input because it is not optional. Service boundaries follow team boundaries whether they are drawn that way or not; a boundary drawn across a team is crossed daily by people who share a standup, and a boundary drawn between two teams is respected because crossing it costs a meeting
- The **inverse Conway manoeuvre** is the deliberate version: decide the architecture wanted, then shape the teams to match, so the communication structure produces it. Independent services need teams that can release without asking; a shared platform needs a team that owns it. The organisation chart is the first architecture diagram

- What follows for this booklet: a service is owned by one team, end to end, including the pager (Module 4, page 9 for what "healthy" means, Module 6 for what the pager reads). Two teams on one service means one release calendar for two roadmaps; one team on six services means six deploy pipelines for one roadmap and, usually, six services that should be two
- Boundaries between teams are where contracts live (Module 5): a schema, a changelog, a deprecation window. Inside a team, a function signature is contract enough

### The failure

- One service, three owning teams. Every release is a negotiation, every incident has three pagers and no owner, a migration waits for the slowest roadmap, and the service's API drifts toward the union of three needs. Either it becomes three services along the team lines, or the three teams become one; the code will not hold a boundary the organisation does not
