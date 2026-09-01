## Exporters - continued

cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    privileged: true
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro

  postgres-exporter:
    image: prometheuscommunity/postgres-exporter:v0.20
    environment:
      DATA_SOURCE_NAME: 'postgresql://app:${POSTGRES_PASSWORD}@db:5432/app?sslmode=disable'

redis-exporter:
    image: oliver006/redis_exporter:v1.90
    environment:
      REDIS_ADDR: 'redis://redis:6379'
      REDIS_PASSWORD: ${REDIS_PASSWORD}
