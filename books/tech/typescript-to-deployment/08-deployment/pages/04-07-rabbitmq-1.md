## RabbitMQ

```yaml
  rabbitmq:
    image: rabbitmq:4-management-alpine
    restart: unless-stopped
    hostname: rabbit1                       # required: the data directory is named after it
    environment:
      RABBITMQ_DEFAULT_USER: app
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD:?}
    volumes:
      - ./data/rabbitmq:/var/lib/rabbitmq
      - ./rabbitmq/rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf:ro
    ports: ["127.0.0.1:15672:15672"]        # management UI, loopback only
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
      interval: 15s
      start_period: 60s
    deploy: { resources: { limits: { memory: 1G } } }
```

```ini
# rabbitmq/rabbitmq.conf
vm_memory_high_watermark.relative = 0.6
disk_free_limit.absolute = 2GB
management.rates_mode = basic
```

### `hostname` is not optional

- **RabbitMQ stores its data under a directory named after the node's hostname.** A container gets a random hostname each time it is recreated
- Without a fixed `hostname`, every restart creates an empty node and **every durable queue and message is orphaned**
