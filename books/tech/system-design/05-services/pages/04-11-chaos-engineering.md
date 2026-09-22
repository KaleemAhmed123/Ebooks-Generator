## Chaos engineering

- Every mechanism in this module is a claim about a failure that has not happened yet: the breaker will open, the fallback is safe, the bulkhead holds, the drain finishes. **Chaos engineering** is testing those claims by causing the failure on purpose, in a controlled way, and watching whether the system does what the design says. Netflix's Chaos Monkey (described publicly in 2011), which killed production instances at random in business hours, is the origin; what grew from it is an experiment, not a stunt

| Step | What it means | Example |
| :--- | :--- | :--- |
| **steady state** | a measurable "working": the SLI users feel (Module 6, page 7) | checkout success ≥ 99.5 %, p99 < 800 ms |
| **hypothesis** | the design's claim, written before the experiment | "with recommendations unreachable, the home page serves cached top sellers and the steady state holds" |
| **injected failure** | one real event: an instance killed, latency raised, a partition, a full disk | drop all packets to recommendations from 5 % of home-page instances |
| **blast radius** | the smallest scope that can disprove the claim; never everything | 5 % of instances, one region, business hours, an owner watching |
| **abort condition** | the signal that stops the experiment on its own | checkout success < 99.5 % for 60 s → stop, restore |
| **result** | the claim held, or a bug found on a Tuesday afternoon, not at 03:00 | the breaker opened; the fallback read an empty cache and the page rendered blank |

- The experiments are this module's pages made into tests: kill an instance (Module 3, page 7; Module 7, page 7); add 2 s of latency (pages 1, 3, 4); fail the authorisation service (page 8, does it deny); fill the queue (page 10, a `503` before memory runs out)
- Start with a game day in staging; go to production only with an abort condition and a small radius, because staging never has production's traffic shape; automate what passes

### The failure

- Resilience that exists only in the design document. The breaker was configured, the fallback written, nobody saw either run, and the first real outage finds the fallback's cache empty and the retry budget on the wrong cluster. Untested resilience is a hypothesis; the outage is the experiment nobody scheduled
