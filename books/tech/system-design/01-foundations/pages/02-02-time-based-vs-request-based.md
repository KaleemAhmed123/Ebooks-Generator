## Two ways to count

- **Time-based** availability: uptime ÷ total time. The system is either up or down at every instant
- **Request-based** availability: successful requests ÷ valid requests. Every request is a vote

| | Time-based | Request-based |
|---|---|---|
| Question it answers | how long was it down | how many users got what they asked for |
| A one-hour 30% error rate | up, 100% | 70% for that hour |
| A global service with one region failing | "down"? there is no single up/down state | the failed region's share of requests |
| A quiet 3 a.m. outage vs a peak-hour one | identical | peak weighs more, because more requests |
| Easy to measure from | a health check | request logs and a definition of "valid" |

- Request-based is what the SRE books use and what the SLO on the previous module's page was written in. It survives partial failure, which is the common kind

### Define "valid" or the number is meaningless

- A 404 for a page that does not exist is not a failed request. A 429 for a client that exceeded its quota is not a failed request. A 500 is
- A request that returned 200 in 12 seconds is a success by status code and a failure to the user. Fold latency into the definition: "answered under 300 ms with a 2xx"
- Write the definition down once. Every dashboard, alert and dispute then reads the same number

### The failure

- Measuring by health check during an incident where the health endpoint is fine and the real endpoints are erroring. The dashboard says 100%. The clock never stopped, so nothing was "down"
- The postmortem then argues about whether an outage happened. That argument is the cost of not having chosen request-based
