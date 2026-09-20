## What one hop costs

- Extracting a function call into a network service changes the physics of the operation. You trade the reliability of a local CPU for the chaos of the network
- Out of the classic "eight fallacies of distributed computing", four will bite you immediately: the network is not reliable, latency is not zero, bandwidth is not infinite, and the topology will change

| The Cost | In a Monolith | Over the Network |
|---|---|---|
| **Latency** | ~5 nanoseconds | ~5 milliseconds (1,000,000× slower) |
| **Failure** | Boolean (it ran or it threw) | Partial failure. Did it fail before executing, during execution, or on the return trip? |
| **Serialization** | Pass a memory pointer | Serialize to JSON/Protobuf, transmit, deserialize |
| **Versioning** | The compiler ensures caller and callee match | Code is deployed at different times. The caller may send v1 while the callee expects v2 |
| **Observability** | One stack trace | Requires distributed tracing and correlation IDs to find the error |

### The failure

- Latency and availability compound. If Service A calls Service B, which calls Service C, the total latency is the sum of all hops
- If each service has a 99% availability SLA, the chain's availability is `0.99 × 0.99 × 0.99 = 0.97` (97%). Three nines quickly becomes one nine. This is why long synchronous call chains are fatal to uptime
