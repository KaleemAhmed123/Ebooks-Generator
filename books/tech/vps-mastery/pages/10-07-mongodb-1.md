## MongoDB in Compose

```yaml
mongo:
  image: mongo:8
  environment:
    MONGO_INITDB_ROOT_USERNAME: root
    MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD:?required}
    MONGO_INITDB_DATABASE: marketplace
  volumes:
    - mongodata:/data/db
  healthcheck:
    test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping').ok"]
    interval: 10s
    retries: 5
    start_period: 20s
  deploy:
    resources:
      limits: { memory: 1G }
  networks: [internal]
  restart: unless-stopped
```

```text
DATABASE_URL=mongodb://app:REDACTED@mongo:27017/marketplace?authSource=admin
```

- `authSource=admin` is needed because the user was created in the `admin` database. Omitting it produces an authentication failure that reads like a wrong password

### There is no Alpine variant

- The official MongoDB image is Debian-based only. It is around 800 MB, and there is no smaller official option
