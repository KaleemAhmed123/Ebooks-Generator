### What LGTM stands for

| Letter | Is | Handles |
|---|---|---|
| **L** | Loki | logs |
| **G** | Grafana | the interface over all of it |
| **T** | Tempo | traces |
| **M** | Mimir | metrics at scale. **Prometheus alone is enough on one box** |

- The pieces are independent. **Start with Prometheus and Grafana, add Loki when grepping containers stops working, add Tempo when you have more than one service**

### The rule whichever you pick

- **The monitoring must not live on the machine it monitors.** A box that dies takes its own alerting with it, and nothing tells you
- On one box that means an external uptime check at minimum, as Module 4 covers
