### Cardinality, which is the one that takes the system down

- **A time series exists for every unique combination of label values.** Ten routes times five statuses times three methods is 150 series, which is nothing
- **One `userId` label with a million users is a million series**, and Prometheus will run out of memory

| Safe label | Never a label |
|---|---|
| route **pattern**, method, status | user id, order id, request id |
| service, environment, version | full URL, email, session |
| queue name, job type | timestamps, free text |

- **The rule: a label may have tens of values, not thousands.** Anything unbounded belongs in a log line, where Loki searches it at query time
