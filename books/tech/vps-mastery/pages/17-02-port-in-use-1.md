## Address already in use

```text
Error response from daemon: driver failed programming external connectivity:
failed to bind host port 0.0.0.0:80: address already in use
```

### Find the holder

```bash
sudo ss -tulpn | grep ':80 '
# tcp LISTEN 0.0.0.0:80  users:(("apache2",pid=1204,fd=4))

sudo lsof -i :80
```

### Stop it properly

```bash
sudo systemctl stop apache2
sudo systemctl disable apache2
```

- **Do not `kill -9` a service.** systemd restarts it and the port is taken again within seconds. Stop the unit

### When the holder is Docker itself

```bash
docker ps -a --filter "publish=80"
docker compose -p app-edge down
```

- A container from an earlier project, still running, is the usual answer on a box that has hosted more than one thing
