## The whole stack, in one file - continued

grafana:
    image: grafana/grafana:13
    environment:
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_PASSWORD:?}
      GF_USERS_ALLOW_SIGN_UP: 'false'
    volumes: ['../data/grafana:/var/lib/grafana',
              './grafana/provisioning:/etc/grafana/provisioning:ro',
              './grafana/dashboards:/var/lib/grafana/dashboards:ro']
    ports: ['127.0.0.1:3000:3000']
    restart: unless-stopped

  node-exporter:
    image: prom/node-exporter:v1
    command: ['--path.rootfs=/host']
    pid: host
    volumes: ['/:/host:ro,rslave']
    restart: unless-stopped

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    privileged: true
    volumes: ['/:/rootfs:ro', '/var/run:/var/run:ro', '/sys:/sys:ro',
              '/var/lib/docker/:/var/lib/docker:ro']
    restart: unless-stopped
```

- **About 2 GB of memory for all of it**, which is why Module 4's sizing page reserves that much
- **Every port on loopback.** Reach Grafana through the tunnel or the private network from Module 4
- **Put it on a second box if you can.** Monitoring that dies with the thing it monitors is not monitoring
