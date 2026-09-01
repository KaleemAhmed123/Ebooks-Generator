### The two alarms that stop everything

- **Memory watermark.** Past 60 percent of the limit, RabbitMQ blocks publishers. Producers hang rather than error, which looks like an application deadlock
- **Disk free limit.** Below the threshold it also blocks. **This is the most common RabbitMQ incident on a small box**

```bash
docker compose exec rabbitmq rabbitmq-diagnostics status | grep -A3 alarms
docker compose exec rabbitmq rabbitmqctl list_queues name messages consumers durable
docker compose exec rabbitmq rabbitmqctl list_connections
```

### Durability, which has three separate parts

- **A durable queue** survives a broker restart. **Persistent messages** survive it. **Publisher confirms** tell you the broker accepted it
- All three are needed, and Booklet 5 covers the code. Missing any one loses messages on a restart
- **Quorum queues are the modern default** for anything that matters, and they need three nodes to be useful. On one box, a durable classic queue is the honest choice
