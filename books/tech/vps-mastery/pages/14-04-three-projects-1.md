## Three Compose projects, not one

- The stack splits into three pieces with different lifetimes

| Project | Contains | Restarts |
|---|---|---|
| `app-data` | postgres, redis, rabbitmq, minio | Almost never |
| `app-edge` | nginx | Reload only, never a restart |
| `app-blue` / `app-green` | The 15 application containers | Every deploy |

```text
/srv/app/
├── data/docker-compose.yml       # started once
├── edge/docker-compose.yml       # started once
├── app/docker-compose.yml        # started twice, as blue and green
├── edge/conf.d/active-color.conf # the switch
└── .env
```

### Two shared networks, declared once

```bash
docker network create app_edge
docker network create app_data --internal
```

- `--internal` on the data network means those containers have **no route to the internet**. A compromised database cannot call out
