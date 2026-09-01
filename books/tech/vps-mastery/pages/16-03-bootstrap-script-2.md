## The bootstrap script - continued

```bash
# swap
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile
  mkswap /swapfile && swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi
echo "vm.swappiness=10" > /etc/sysctl.d/99-swap.conf && sysctl -p /etc/sysctl.d/99-swap.conf

# docker
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  > /etc/apt/sources.list.d/docker.list
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io \
                   docker-buildx-plugin docker-compose-plugin
usermod -aG docker "$DEPLOY_USER"

cat > /etc/docker/daemon.json <<'JSON'
{ "log-driver": "json-file",
  "log-opts": { "max-size": "10m", "max-file": "3" },
  "builder": { "gc": { "enabled": true, "defaultKeepStorage": "10GB" } } }
JSON
systemctl restart docker

timedatectl set-timezone UTC
hostnamectl set-hostname "${NEW_HOSTNAME:-prod-1}"

docker network create app_edge || true
docker network create app_data --internal || true

echo "bootstrap complete"
```

- **Test this on a throwaway box now.** A bootstrap script debugged during an outage is not a bootstrap script
