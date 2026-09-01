## Node exporter and cAdvisor

### node-exporter reads the host

```yaml
node-exporter:
  image: prom/node-exporter:v1.9.1
  command:
    - "--path.rootfs=/host"
    - "--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)"
  volumes:
    - /:/host:ro,rslave
  pid: host
  networks: [edge]
  restart: unless-stopped
```

- CPU, memory, disk, network and load, straight from the kernel
- `pid: host` lets it see the real process table. `rslave` propagates new mounts

### cAdvisor reads the containers

```yaml
cadvisor:
  image: gcr.io/cadvisor/cadvisor:v0.52.1
  volumes:
    - /:/rootfs:ro
    - /var/run:/var/run:ro
    - /sys:/sys:ro
    - /var/lib/docker/:/var/lib/docker:ro
    - /dev/disk/:/dev/disk:ro
  devices: ["/dev/kmsg"]
  privileged: true
  networks: [edge]
  restart: unless-stopped
```

- Per-container CPU, memory, and network. This is what answers "which service is eating the box"
- It needs `privileged: true`, which is a real grant. If that is unacceptable, `docker stats` covers the same ground manually
