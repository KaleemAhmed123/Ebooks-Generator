## Limiting and shedding are not the same thing

- Both reject requests, and that is all they share. A limit is a promise made to one caller about their own usage. Shedding is a server deciding it cannot serve everyone and choosing who to disappoint

| | Rate limiting | Load shedding |
|---|---|---|
| The question | has this caller exceeded their share | is this server past what it can serve |
| Scope | one key | the whole instance |
| Configured from | a plan, a contract, a fairness rule | measured capacity, right now |
| Who gets refused | the caller who went over | whoever is least important (Module 4, page 5) |
| Changes when | someone changes the policy | load changes, second by second |
| Answer | `429` | `503`, fast and cheap |

- The two are set by different numbers and should be, because they answer different questions. A limit derived from capacity goes stale the moment the fleet is resized; capacity derived from a limit is a guess about how many callers will be active at once
- Stripe's published arrangement is the shape to copy: a request-rate limiter and a concurrency limiter for per-caller fairness, and separately a load shedder that reserves a fraction of the fleet — their example is 20 % — for critical traffic, plus a worker-utilisation shedder that drops by priority class

### The failure

- Believing the limiter protects the server. Ten thousand well-behaved callers at ten requests per second each is a hundred thousand requests per second, no caller has exceeded anything, the limiter passes all of it through, and the service falls over
- The limiter was never measuring the thing that kills the server. It counts per key, and the server dies of the sum. Fairness between callers and survival under aggregate load are separate problems, and a system with only one of the two mechanisms is missing a failure mode rather than covering it cheaply
