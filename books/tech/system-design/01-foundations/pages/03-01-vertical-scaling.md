# Module 3 - Scaling dimensions

## Buy a bigger box

- **Vertical scaling** means replacing the machine with a bigger one: more CPU, more memory, more disk
- Zero code change. No distributed-systems problems. One process, one copy of the data, full consistency for free
- It works until it does not. The ceiling is real:

| Resource | Largest EC2 instance (2026-09) |
|---|---|
| vCPU | 896 |
| Memory | 32,768 GiB |
| Instance | `u7in-32tb.224xlarge` (Sapphire Rapids) |

- Past the ceiling you are stuck. Below it you are still one box

### The blast radius

- A bigger box is a bigger single point of failure. When it dies, everything on it dies at once
- There is no replica to take over. Recovery is "start a new one and reload." That is minutes, not milliseconds
- Vertical scaling buys time. It does not buy survivability

### The failure

- A database sized up to the largest instance. It handles the load. Then it dies at peak, and the recovery time is longer than the SLO allows, because there is only one
- The follow-up question is always: "what happens when that box goes down?" A vertical-only design has one answer: "we page someone"
