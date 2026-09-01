## Installing Docker

- **Not from the Ubuntu archive.** That package is old and it is not the one the Docker documentation describes

```bash
# the official repository
apt install -y ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" \
  > /etc/apt/sources.list.d/docker.list

apt update
apt install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin

systemctl enable --now docker
docker version && docker compose version
```

### Let the deploy user run it

```bash
usermod -aG docker deploy
# log out and back in for the group to take effect
```

- **Membership of the `docker` group is equivalent to root.** Anyone in it can mount the host filesystem into a container. That is fine for the person who administers the box, and it is not a permission to hand out casually
