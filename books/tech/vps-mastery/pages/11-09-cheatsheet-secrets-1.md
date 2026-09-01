## Cheatsheet: secrets

### On the box

```bash
chmod 600 /srv/app/.env
chown kaleem:kaleem /srv/app/.env
git check-ignore -v .env             # must print a match
grep -rn "password\|secret\|token" --include="*.ts" src/ | grep -v process.env
```

### Generating values

```bash
openssl rand -base64 32              # a 32-byte key
openssl rand -hex 16                 # a shorter identifier
uuidgen
```

### SOPS and age

```bash
age-keygen -o ~/.config/sops/age/keys.txt
sops --encrypt --age age1ql3z7... .env > .env.enc
SOPS_AGE_KEY_FILE=~/.config/sops/age/keys.txt sops --decrypt .env.enc > .env
sops .env.enc                        # edit in place, re-encrypted on save
```

### Checking what a container can see

```bash
docker compose exec orders env | sort
docker inspect orders --format '{{json .Config.Env}}' | tr ',' '\n'
docker compose exec orders cat /run/secrets/db_password
```

### Auditing an image for a baked-in secret

```bash
docker history --no-trunc ghcr.io/kaleem/orders:7f3a91c | grep -iE "token|key|password"
```
