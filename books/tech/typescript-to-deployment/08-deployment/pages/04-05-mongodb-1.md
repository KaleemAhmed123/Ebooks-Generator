## MongoDB

```yaml
  mongo:
    image: mongo:8.3
    restart: unless-stopped
    command: ["--replSet", "rs0", "--bind_ip_all", "--keyFile", "/etc/mongo/keyfile"]
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD:?}
    volumes:
      - ./data/mongo:/data/db
      - ./mongo/keyfile:/etc/mongo/keyfile:ro    # chmod 400, owned by 999
    healthcheck:
      test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      start_period: 40s
    deploy: { resources: { limits: { memory: 3G } } }
```

### Run it as a replica set even with one node

```bash
openssl rand -base64 756 > mongo/keyfile && chmod 400 mongo/keyfile

docker compose exec mongo mongosh -u root -p --eval '
  rs.initiate({_id:"rs0", members:[{_id:0, host:"mongo:27017"}]})'
```

- **Transactions and change streams require a replica set.** A standalone MongoDB silently does not support them, and the error appears the first time a transaction runs in production
- A single-member replica set gives both, with no second machine
- The connection string then needs `?replicaSet=rs0`
