## Byzantine faults — mostly out of scope

- A **Byzantine fault** is a node that actively lies: sends wrong values, contradicts itself, or pretends to be another node
- A **crash fault** is a node that stops talking. It does not send wrong data — it sends nothing
- Most datacenter systems assume crash faults only. The hardware is trusted; the network is not

| Fault type | Assumption | Example |
|---|---|---|
| Crash | the node is silent | process crashes, network cable unplugged |
| Omission | the node drops some messages | overloaded NIC, full buffer |
| Byzantine | the node sends wrong values | bit flip, compromised node, software bug |

- Dealing with Byzantine faults is expensive: it requires BFT (Byzantine fault tolerance) protocols, which need 3f + 1 nodes to tolerate f faults. That means four nodes to handle one liar
- In practice, Byzantine tolerance is reserved for blockchain, safety-critical avionics, and some financial systems. This series assumes crash-fault models throughout

### The exception that matters

- Software bugs can make a non-Byzantine node act Byzantine. A corrupted row, a serialisation bug that changes the value, a clock that goes backwards — these produce wrong data from a trusted node
- Checksums, assertions, and end-to-end validation catch the practical cases. Full BFT catches the theoretical ones
