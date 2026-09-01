## Reaching the admin interfaces

- Every service in this module has a web interface: RabbitMQ management, MinIO console, Gitea, Uptime Kuma, pgAdmin, Grafana
- **None of them should be on the public internet.** They are the highest-value target on the box and several have had authentication bypasses

### The three ways in, worst to best

| Approach | Verdict |
|---|---|
| published port, public | **never** |
| public with basic auth or a login page | acceptable for one or two, with strong credentials |
| **SSH tunnel** | free, always available, no setup |
| **a private network** | the right answer for a team |

### The tunnel, which needs nothing installed

```bash
ssh -L 15672:localhost:15672 -L 9001:localhost:9001 -L 3001:localhost:3001 prod
# now open http://localhost:15672 on your laptop
```

- **Bind every admin port to `127.0.0.1` and tunnel to it.** That is the whole security model, and it costs nothing
