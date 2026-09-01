## The rebuild, step by step

```bash
# --- 0. provision a new box, note the address ---   ~3 min

# --- 1. bootstrap ---                                ~5 min
scp bootstrap.sh root@203.0.113.44:/root/
ssh root@203.0.113.44 \
  "SSH_PUBKEY='ssh-ed25519 AAAA...' NEW_HOSTNAME=prod-1 bash /root/bootstrap.sh"

# --- 2. code and secrets ---                         ~3 min
ssh kaleem@203.0.113.44
sudo mkdir -p /srv/app && sudo chown kaleem:kaleem /srv/app
cd /srv/app
git clone git@github-marketplace:kaleem/marketplace.git .

export SOPS_AGE_KEY_FILE=~/.config/sops/age/keys.txt   # copied from the password manager
sops --decrypt .env.enc > .env && chmod 600 .env

# --- 3. data layer, empty ---                        ~2 min
docker compose -p app-data -f data/docker-compose.yml up -d
docker compose -p app-data ps        # wait for healthy

# --- 4. restore ---                                  ~10 min
source /root/.restic-env
restic restore latest --target /tmp/restore
docker compose -p app-data exec -T postgres \
  pg_restore -U app -d marketplace --clean --if-exists \
  < /tmp/restore/srv/app/backups/marketplace-*.dump

docker compose -p app-data exec -T postgres psql -U app -d marketplace \
  -c "SELECT count(*) FROM orders;"        # sanity check, not optional
```
