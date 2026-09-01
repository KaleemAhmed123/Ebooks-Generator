## A registry and a git server

### The private registry

```yaml
  registry:
    image: registry:3
    restart: unless-stopped
    environment:
      REGISTRY_STORAGE_DELETE_ENABLED: 'true'
    volumes: ["./data/registry:/var/lib/registry"]
    ports: ["127.0.0.1:5000:5000"]
```

```text
# put it behind the proxy, with auth
registry.example.com {
	basic_auth { deploy $2a$14$... }
	reverse_proxy registry:5000
}
```

- **`registry:3` is enough for one team.** It is a file store with an API and nothing else
- **Harbor** adds users, scanning, replication and retention policies, and costs about 4 GB of memory. Worth it once several people push
- **Set a retention policy either way.** Images accumulate at gigabytes a week and nothing deletes them

```bash
registry garbage-collect /etc/docker/registry/config.yml --delete-untagged
```
