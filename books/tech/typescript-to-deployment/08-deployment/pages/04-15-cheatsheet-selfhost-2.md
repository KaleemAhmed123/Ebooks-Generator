### RabbitMQ

```bash
docker compose exec rabbitmq rabbitmqctl list_queues name messages consumers
docker compose exec rabbitmq rabbitmqctl list_connections
docker compose exec rabbitmq rabbitmq-diagnostics status | grep -A3 alarms
docker compose exec rabbitmq rabbitmqctl purge_queue orders.dlq
docker compose exec rabbitmq rabbitmqctl add_user app 'pw' && rabbitmqctl set_permissions -p / app '.*' '.*' '.*'
```

### MinIO

```bash
mc alias set local http://minio:9000 "$USER" "$PW"
mc ls local/uploads && mc du local/uploads
mc cp file.pdf local/uploads/ && mc rm local/uploads/file.pdf
mc mirror --watch local/uploads b2/offsite
mc admin info local
```
