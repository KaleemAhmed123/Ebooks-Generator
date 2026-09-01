## Three fixes for the Docker firewall hole

### Fix 1: publish to loopback only (use this one)

- A published port takes an optional host address. Give it `127.0.0.1` and the mapping exists only on the box

```yaml
ports:
  - "127.0.0.1:5432:5432"
```

- Nothing outside can reach it, whatever the firewall says. This is the default position for everything in this booklet

### Fix 2: publish nothing at all

- Containers on the same Docker network reach each other by service name, with no published port anywhere
- Use `expose` for documentation, or omit ports entirely. Only Nginx publishes 80 and 443

```yaml
services:
  db:
    image: postgres:18-alpine
    expose:
      - "5432"
```

- This is the strongest option and the one Part Four uses for the full stack

### Fix 3: write rules into DOCKER-USER

- Docker reserves a chain called `DOCKER-USER`, evaluated before its own rules and preserved across daemon restarts

```bash
sudo iptables -I DOCKER-USER -i eth0 ! -s 10.0.0.0/8 -j DROP
```

- Correct, and easy to get wrong. Needed only when a port genuinely must be published to selected outside addresses

:::note
Fix 1 and Fix 2 need no firewall knowledge and cannot be undone by a Docker upgrade. Reach for Fix 3 last.
:::
