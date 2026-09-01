### The node exporter, ready for Module 14

```yaml
  node-exporter:
    image: prom/node-exporter:latest
    restart: unless-stopped
    command:
      - '--path.rootfs=/host'
    pid: host
    volumes: ['/:/host:ro,rslave']
    ports: ["127.0.0.1:9100:9100"]
```

- It exposes CPU, memory, disk, filesystem and network metrics on `/metrics`
- **Install it now even if nothing scrapes it yet.** When Module 14 adds Prometheus, the history starts from whenever this began

### The one-line disk alarm, if nothing else exists

```bash
0 * * * * df -h / | awk 'NR==2 && int($5) > 85 { print "disk " $5 }' | mail -s 'disk' me@example.com
```
