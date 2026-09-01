### Docker log drivers

```yaml
logging:
  driver: json-file
  options: { max-size: '20m', max-file: '5' }
```

```yaml
logging:
  driver: awslogs
  options:
    awslogs-group: /ecs/orders-api
    awslogs-region: ap-south-1
    awslogs-stream-prefix: api
```

| Driver | Note |
|---|---|
| `json-file` | the default. **Unbounded without `max-size`**, and that fills disks |
| `local` | like `json-file` but compressed and capped by default |
| `awslogs` | straight to CloudWatch, used by ECS |
| `journald` | into systemd, then `journalctl` |
| `loki` | a plugin, and an agent is usually better |

- **`docker logs` only works with `json-file`, `local` and `journald`.** Switching to `awslogs` means losing the local command, which surprises people mid-incident

### The agent approach, which is what Module 14 builds

- **Alloy reads the container log files from the host and pushes to Loki**, adding labels from Docker metadata
- The application knows nothing. Switching destinations is an agent config change and no deploy
- **This is the shape to prefer**, and the next two pages set it up

### Retention, everywhere

- **Set it once, on every destination.** CloudWatch defaults to forever, `json-file` defaults to unbounded, and Loki keeps what you tell it
- 30 days for application logs, 90 for anything audit-shaped, is a reasonable starting point
