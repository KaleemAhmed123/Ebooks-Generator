## Installing Docker

- Ubuntu ships a `docker.io` package. It lags behind and does not include the Compose v2 plugin. Use Docker's own repository

```bash
sudo apt update
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) \
signed-by=/etc/apt/keyrings/docker.asc] \
https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin
```

### Verify

```bash
docker --version           # Docker version 28.x.x
docker compose version     # Docker Compose version v2.x.x
sudo docker run --rm hello-world
```

### About the convenience script

- `curl -fsSL https://get.docker.com | sh` works and is fine for a throwaway box
- It is a remote script run as root, and it does not pin a version. The repository method above is what a rebuild script should use, because it produces the same result in six months

### Docker starts at boot

```bash
sudo systemctl is-enabled docker      # enabled
```
