### The escalation, in order

```bash
# 1. one service
docker compose restart orders

# 2. one service, fresh container
docker compose up -d --force-recreate --no-deps orders

# 3. the whole color, volumes untouched
docker compose -p app-green down
docker compose -p app-green up -d

# 4. networks are tangled
docker compose -p app-green down
docker network prune -f
docker compose -p app-green up -d

# 5. the daemon itself
sudo systemctl restart docker
```

- Step 5 restarts every container on the box. It is the real nuclear option and it fixes leftover `docker-proxy` processes and stuck networks

### The flag that must never be typed carelessly

```bash
docker compose down -v          # DELETES THE VOLUMES
docker system prune --volumes   # the same, across every project
```

- **There is no confirmation and no undo.** The only recovery is the backup from Module 12
