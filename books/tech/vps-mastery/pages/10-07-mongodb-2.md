### Transactions need a replica set

- Multi-document transactions do not work on a standalone server. A single-node replica set is the usual workaround:

```yaml
command: ["mongod", "--replSet", "rs0", "--bind_ip_all"]
```

```bash
docker compose exec mongo mongosh --eval 'rs.initiate()'
```

- One node in a replica set gives transactions and change streams without a second server. It provides no redundancy, which is what the name suggests it might

### Memory

- MongoDB sizes its cache from the **host** memory, not the container limit, on older versions. Set it explicitly if the container is being killed:

```yaml
command: ["mongod", "--wiredTigerCacheSizeGB", "0.5"]
```
