### The three fixes, best first

```bash
# 1. bind to loopback. The proxy is the only public listener
docker run -p 127.0.0.1:3000:3000 myapp
```

```yaml
# in compose
ports: ["127.0.0.1:3000:3000"]
```

```bash
# 2. do not publish at all. Containers reach each other by name on their network
# (no ports: entry for db or redis, ever)
```

```bash
# 3. if a port genuinely must be public and filtered, use the DOCKER-USER chain
iptables -I DOCKER-USER -i eth0 ! -s 203.0.113.0/24 -p tcp --dport 5432 -j DROP
```

- **Fix one is the answer in almost every case.** Bind to `127.0.0.1`, put Nginx or Caddy in front, and the problem does not exist
- **Audit it after every deploy:** `ss -tulpn | grep -v 127.0.0.1` lists everything actually listening on a public interface
