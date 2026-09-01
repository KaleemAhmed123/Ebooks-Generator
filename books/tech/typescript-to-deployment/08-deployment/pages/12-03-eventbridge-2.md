### The three things it is good at

- **Content-based routing.** The rule above needs no code and no consumer-side filtering
- **AWS service events.** An ECS task stopping, an RDS failover, an S3 object created, a CodePipeline stage failing. Everything AWS does emits an event
- **Schedules.** EventBridge Scheduler replaces a cron server entirely

```bash
aws scheduler create-schedule --name nightly-report \
  --schedule-expression 'cron(0 2 * * ? *)' \
  --schedule-expression-timezone 'Asia/Kolkata' \
  --flexible-time-window '{"Mode":"OFF"}' \
  --target '{"Arn":"arn:aws:sqs:...","RoleArn":"arn:aws:iam::...:role/scheduler"}'
```

- **A schedule that puts a message on a queue is better than one that calls a service directly**, because the retry and the backlog are then visible

### The schema registry

- EventBridge can discover event shapes and generate types, which turns an event contract into something the compiler checks
- **Version the `detail-type` from the start**, such as `order.created.v1`. Changing an event shape in place breaks every consumer at once
