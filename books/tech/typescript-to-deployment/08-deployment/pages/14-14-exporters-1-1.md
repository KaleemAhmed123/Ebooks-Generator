## Exporters

- Prometheus scrapes HTTP. **An exporter is a small process that translates something else into that format**, and there is one for nearly everything

| Exporter | Gives you |
|---|---|
| **node-exporter** | CPU, memory, disk, filesystem, network, load |
| **cAdvisor** | per-container CPU, memory, restarts, throttling |
| **postgres-exporter** | connections, locks, replication lag, table sizes, cache hit rate |
| **redis-exporter** | memory, evictions, hit rate, connected clients, keyspace |
| **blackbox-exporter** | probes an endpoint from outside: HTTP, TCP, DNS, certificate expiry |
| Nginx, RabbitMQ, MinIO, Traefik | expose metrics themselves or have an official exporter |

```yaml
  node-exporter:
    image: prom/node-exporter:v1
    command: ['--path.rootfs=/host']
    pid: host
    volumes: ['/:/host:ro,rslave']
