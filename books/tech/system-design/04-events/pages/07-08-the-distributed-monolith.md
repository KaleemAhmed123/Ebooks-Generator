## The Distributed Monolith

- The promise of microservices is that teams can build, deploy, and scale independently. But if you design your event-driven architecture poorly, you end up with the worst of both worlds: **The Distributed Monolith**.
- You have all the complexity of network latency, Kafka partitions, and eventual consistency, but you still cannot deploy independently.

| Sign you built a Distributed Monolith | The Root Cause |
|---|---|
| **Lock-step deployments** | "We can't deploy Service A until Service B finishes their deployment." (Coupled schemas). |
| **End-to-end testing nightmares** | "We can't test our service locally; we have to spin up 45 other services in a staging environment to get a single event to flow." |
| **Shared databases disguised as events** | Using Event-Carried State Transfer to literally sync the entire Postgres database of Service A into Service B's database. |
| **Cascading latency** | Service A emits an event, synchronously waits for Service B to emit an event back, and times out if it takes too long. (The Request-Reply Trap). |

- An event-driven architecture should reduce coupling. If an upstream service goes down, your service should ideally continue functioning (perhaps with degraded features). 

### The failure

- You must deploy A and B at the exact same time. The ultimate failure of an EDA is when teams lose their autonomy. If a simple feature requires 4 teams to coordinate a midnight deployment because they all need to change their event schemas simultaneously, you have failed. You would have been much faster, much safer, and much happier just building a majestic Ruby on Rails or Django monolith
