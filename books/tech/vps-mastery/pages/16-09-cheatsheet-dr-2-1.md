### The sequence

```bash
# 1  provision, note the new address
# 2  bootstrap
scp bootstrap.sh root@NEW/root/
ssh root@NEW "SSH_PUBKEY='ssh-ed25519 AAAA...' bash /root/bootstrap.sh"

# 3  code and secrets
git clone git@github-marketplace:kaleem/marketplace.git /srv/app
cd /srv/app && sops --decrypt .env.enc > .env && chmod 600 .env

# 4  data layer
docker compose -p app-data -f data/docker-compose.yml up -d

# 5  restore
restic restore latest --target /tmp/restore
docker compose -p app-data exec -T postgres \
  pg_restore -U app -d marketplace --clean --if-exists < /tmp/restore/.../marketplace-*.dump
docker compose -p app-data exec -T postgres psql -U app -d marketplace -c "SELECT count(*) FROM orders;"

# 6  application
COLOR=blue IMAGE_TAG=$(cat .last-good-tag) \
  docker compose -p app-blue -f app/docker-compose.yml up -d

# 7  verify BEFORE dns
docker compose -p app-blue exec -T orders curl -fsS http://api-gateway:8080/readyz

# 8  dns, then tls, then edge
sudo certbot certonly --standalone -d example.com -d www.example.com -d api.example.com
./scripts/write-color.sh blue
docker compose -p app-edge -f edge/docker-compose.yml up -d

# 9  verify from outside
curl -sI https://example.com | head -1
```
