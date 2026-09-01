## The trap: Docker bypasses UFW

- UFW writes its rules into the kernel `INPUT` chain, which handles packets addressed to the host itself
- Docker publishes a port by writing a **destination NAT** rule in `PREROUTING` and a matching accept rule in its own `DOCKER` chain, which hangs off `FORWARD`
- A packet aimed at a published container port is rewritten in `PREROUTING` and forwarded. **It never reaches `INPUT`, so UFW never sees it**

### What that looks like in practice

```yaml
services:
  db:
    image: postgres:18-alpine
    ports:
      - "5432:5432"
```

```bash
sudo ufw deny 5432
sudo ufw status | grep 5432
# 5432    DENY IN    Anywhere
```

- The rule is there. The database is still reachable from the internet. The deny applies to a path the traffic does not take

### Prove it, do not assume it

- Firewall behavior has shifted across Docker releases. Test the actual box rather than trusting a version number
- From a **different machine**, not from the server:

```bash
nc -zv 203.0.113.10 5432
# Connection to 203.0.113.10 5432 port [tcp/postgresql] succeeded!
```

- A succeeded line for any port other than 22, 80 and 443 is a finding, not a curiosity

### Why this is so common

- Every tutorial writes `ports: - "5432:5432"`. It works locally, it works on the server, and nothing warns that it is now public
