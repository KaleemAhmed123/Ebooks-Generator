## Why Compose

- Running the stack by hand means one `docker run` per service, each with its own flags, network, volumes and environment, in the right order
- **Compose** puts all of that in one file and reduces the whole thing to two commands

```bash
docker compose up -d
docker compose down
```

### What the file replaces

```bash
docker network create app_net
docker volume create pgdata
docker run -d --name postgres --network app_net \
  -v pgdata:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=... postgres:18-alpine
docker run -d --name orders --network app_net \
  --env-file .env -p 127.0.0.1:8080:8080 marketplace/orders:7f3a91c
```

- Six lines nobody remembers, against a file that is committed, reviewed, and identical on every machine

### `docker compose`, not `docker-compose`

- Compose v1 was a separate Python program invoked with a hyphen. It reached end of life in July 2023
- Compose v2 is a Docker plugin, invoked as a subcommand. Every command in this booklet uses the space

### One file, one stack, one directory

- Compose derives a **project name** from the directory. Every container, network and volume is prefixed with it
- Two stacks in two directories never collide. The same fact makes blue-green deployment possible in Module 14
