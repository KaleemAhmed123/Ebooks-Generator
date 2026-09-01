## RabbitMQ

- A **message broker** decouples the caller from the worker. The order service publishes an event and returns. The notification service consumes it whenever it can

```yaml
rabbitmq:
  image: rabbitmq:4.3-management-alpine
  environment:
    RABBITMQ_DEFAULT_USER: app
    RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD:?required}
  volumes:
    - rabbitdata:/var/lib/rabbitmq
  healthcheck:
    test: ["CMD", "rabbitmq-diagnostics", "-q", "check_running"]
    interval: 15s
    timeout: 10s
    retries: 5
    start_period: 40s
  deploy:
    resources:
      limits: { memory: 512M }
  networks: [internal]
  restart: unless-stopped
```

- `start_period: 40s` is not padding. RabbitMQ takes that long to start on a small box, and a shorter grace window produces an endless restart loop

### Two jobs it does

| Job | Shape |
|---|---|
| **Work queue** | One message, one consumer. Sending an email, generating an invoice |
| **Fan-out** | One message, every consumer. Broadcasting to every socket server |

- The second is why a broker appears as soon as there is more than one instance of a socket service. A message arriving at instance A must reach a user connected to instance B
