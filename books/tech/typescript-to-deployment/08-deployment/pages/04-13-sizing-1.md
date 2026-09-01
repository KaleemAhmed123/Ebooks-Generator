## Sizing the box for all of this

- Every service takes memory whether it is busy or not. **Adding them up before choosing an instance avoids the out-of-memory afternoon**

| Service | Realistic floor | Comfortable |
|---|---|---|
| Node API | 150 MB | 400 MB |
| worker | 150 MB | 300 MB |
| PostgreSQL | 512 MB | **2 to 4 GB** |
| Redis | 100 MB | 512 MB to 1 GB |
| MongoDB | 512 MB | **2 GB** |
| RabbitMQ | 200 MB | 512 MB |
| Meilisearch | 200 MB | 1 GB |
| MinIO | 200 MB | 512 MB |
| Caddy | 30 MB | 60 MB |
| Prometheus + Grafana + Loki | 700 MB | **2 GB** |
| the operating system | 300 MB | 500 MB |

### The arithmetic

- **App + Postgres + Redis + Caddy** comfortably: about 4 GB. **This is the common production shape**
- Add the monitoring stack: **8 GB**
- Add MongoDB, RabbitMQ, search and object storage: **16 GB**

### The rules

- **Set a memory limit on every container.** Without limits the first thing the kernel kills is whichever process is largest, which is your database
- **Leave 20 percent unallocated.** Page cache, build spikes and a `pg_dump` all need room
- **Databases and the monitoring stack want their own box** before anything else moves. They are the two that compete hardest for memory
