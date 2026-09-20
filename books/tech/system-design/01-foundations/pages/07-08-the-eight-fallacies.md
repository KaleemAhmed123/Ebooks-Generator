## The eight fallacies of distributed computing

- Peter Deutsch and James Gosling (Sun Microsystems, 1994) listed eight assumptions that developers make about the network, all false:

1. The network is reliable
2. Latency is zero
3. Bandwidth is infinite
4. The network is secure
5. Topology doesn't change
6. There is one administrator
7. Transport cost is zero
8. The network is homogeneous

- Every module in this booklet is a consequence of at least one of these fallacies

| Fallacy | Where it bites in this booklet |
|---|---|
| 1. Reliable | this module, timeouts, retries |
| 2. Zero latency | Module 4 (latency numbers), Module 6 (request lifecycle) |
| 3. Infinite bandwidth | Module 4 (serialisation costs), Module 5 (bandwidth estimation) |
| 5. Topology doesn't change | Module 6 (DNS, LB routing) |
| 7. Transport cost is zero | Module 5 (cost envelope — egress) |

### The failure

- A developer who calls `await fetch()` without a timeout, without a retry, without a content-length budget, trusting a DNS record that changes, and logging no telemetry on the call. Five fallacies in one line of code
