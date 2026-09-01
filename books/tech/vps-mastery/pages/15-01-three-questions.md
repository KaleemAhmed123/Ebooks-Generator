## The three questions

- Monitoring exists to answer three questions, and each needs a different tool

| Question | Tool | Data |
|---|---|---|
| **Is it up?** | Uptime Kuma | A request every 60 seconds from outside |
| **Is it healthy?** | Prometheus and Grafana | Numbers over time |
| **What happened?** | Loki | Log lines, searchable across services |

- Answering only the first is common and insufficient. A site returning 200 while every order fails is up and broken

### Build them in that order

1. **Uptime checks first.** Twenty minutes of work, and it covers the outage that matters most
2. **Metrics second.** Once "it feels slow" needs an answer
3. **Logs third.** Once `docker logs` across fifteen services stops being workable

### The four numbers to watch first

| Signal | Alert when |
|---|---|
| **Latency** | 95th percentile above a threshold users notice |
| **Errors** | 5xx rate above a small percentage of requests |
| **Traffic** | Sudden drop. Often the first sign of an outage upstream |
| **Saturation** | Disk above 80%, memory available below 10% |

### What to skip

- CPU as a primary alert. It is high during normal work and low during an outage
- Dashboards nobody opens. A dashboard that is not consulted during an incident is decoration
- Alerting on every metric. An alert that fires weekly and is ignored has trained everyone to ignore alerts
