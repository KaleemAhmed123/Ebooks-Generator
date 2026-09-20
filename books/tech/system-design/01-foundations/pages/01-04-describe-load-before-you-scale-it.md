## Load has parameters

- "Make it scalable" is not a requirement. Scalable *along which axis*, from *what* to *what*
- Every system has a handful of numbers that describe its load. Name them before drawing a box

| Parameter | What it measures | Why it changes the design |
|---|---|---|
| **Requests per second** | arrival rate, peak and average | how many instances, how big a queue |
| **Read/write ratio** | reads per write | caches and replicas help reads; writes need the primary |
| **Data size** | total bytes and growth per month | when one disk, then one machine, stops fitting |
| **Fan-out** | how many records one request touches | a feed for 1 follower and for 10M followers are different systems |
| **Concurrent connections** | open sockets held at once | memory per connection, file-descriptor limits, long-lived vs short |
| **Regions** | where the users are | speed of light sets a floor on latency |

- Growth in one parameter rarely moves the others. Ten times the users may be ten times the reads and the same writes

### The interview move

- Ask for these numbers before proposing anything. If the interviewer has none, state your assumption and derive from it
- "100M users, 10% daily, 20 reads each" is a design input. "Lots of users" is not
- Then check which parameter is the one that grows. That is the axis the design must bend along; the others can stay simple

### The failure

- A "scalable" design built for request rate, when the real growth was fan-out. A social timeline is the classic case: request rate is fine, one account with millions of followers is not. Module 7 of the case studies booklet builds that system
