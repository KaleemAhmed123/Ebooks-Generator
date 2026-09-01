### Getting logs there

| From | Use |
|---|---|
| ECS | the `awslogs` log driver in the task definition |
| EC2 with Docker | `--log-driver awslogs --log-opt awslogs-group=...` |
| EC2 without Docker | the CloudWatch agent reading the journal |
| Lambda | automatic |

- **Never write log files inside a container.** They vanish with it, and they fill the disk on the way
