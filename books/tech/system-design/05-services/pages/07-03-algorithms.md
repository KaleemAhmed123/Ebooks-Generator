## Load balancing algorithms

- When a request arrives, the load balancer must choose a backend. The choice is driven by an algorithm

| Algorithm | How it works | When to use it |
|---|---|---|
| **Round Robin** | A, B, C, A, B, C. (Or Weighted Round Robin: A, A, B, C) | When all requests take roughly the same amount of CPU |
| **Least Connections** | Sends to the instance with the fewest active connections | When request durations vary wildly (e.g., long file uploads) |
| **Hash / Consistent Hash** | Hashes the IP or a URL parameter to pick an instance | When you need caching locality or sticky sessions |
| **Random** | Picks a completely random instance | High-throughput systems where health state is unknown |

### The failure

- The failure is using strict Round Robin when your instances have different sizes (heterogeneous hardware). If Instance A has 32 cores and Instance B has 2 cores, Round Robin will send them the exact same number of requests
- Instance B will immediately crash from overload, while Instance A sits mostly idle. You must use Weighted Round Robin, assigning a weight proportional to the CPU cores, or use Least Connections so the slower machine naturally receives less traffic as its connections pile up
