## The whole stack, in one file

```yaml
# monitoring/compose.yml, started with --profile observability
services:
  prometheus:
    image: prom/prometheus:v3
    command: ['--config.file=/etc/prometheus/prometheus.yml',
              '--storage.tsdb.retention.time=30d', '--web.enable-lifecycle']
    volumes: ['./prometheus.yml:/etc/prometheus/prometheus.yml:ro',
              './rules:/etc/prometheus/rules:ro', '../data/prometheus:/prometheus']
    ports: ['127.0.0.1:9090:9090']
    restart: unless-stopped

  alertmanager:
    image: prom/alertmanager:v0.34
    volumes: ['./alertmanager.yml:/etc/alertmanager/alertmanager.yml:ro']
    restart: unless-stopped

  loki:
    image: grafana/loki:3
    command: -config.file=/etc/loki/config.yml
    volumes: ['./loki.yml:/etc/loki/config.yml:ro', '../data/loki:/loki']
    restart: unless-stopped

  tempo:
    image: grafana/tempo:2
    command: -config.file=/etc/tempo/config.yml
    volumes: ['./tempo.yml:/etc/tempo/config.yml:ro', '../data/tempo:/var/tempo']
    restart: unless-stopped

  alloy:
    image: grafana/alloy:latest
    command: ['run', '--server.http.listen-addr=0.0.0.0:12345', '/etc/alloy/config.alloy']
    volumes: ['./config.alloy:/etc/alloy/config.alloy:ro',
              '/var/run/docker.sock:/var/run/docker.sock:ro',
              '/var/lib/docker/containers:/var/lib/docker/containers:ro']
    restart: unless-stopped
