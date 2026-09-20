## The default is forever

- If you do not configure a timeout, the system assumes you want to wait forever. At scale, forever means "until all concurrency is exhausted"

| System | Default timeout | Behaviour when unreachable |
|---|---|---|
| gRPC client (Google's RPC framework) | none | waits indefinitely |
| Node `server.timeout` | 0 (none) | holds connection open indefinitely |
| Postgres `statement_timeout` | 0 (none) | query runs until finished or connection drops |
| TCP established | ~13–30 minutes | Linux retries unacknowledged packets 15 times before giving up |

- An established TCP connection where the other end is silently unplugged does not fail immediately. The kernel retries sending data, backing off, for 13 to 30 minutes before returning an error to the application

### The failure

- A thread pool that makes a synchronous call to a dead host with no timeout. The first thread waits a quarter of an hour or more. So does the second. Within seconds, every thread in the pool is waiting. The service that makes the call is now completely down
- A service is only as available as its longest unguarded timeout. If you call a service without a timeout, its failures are your failures
