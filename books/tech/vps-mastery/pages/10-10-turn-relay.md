## A TURN relay, when video calls are involved

- **WebRTC** connects two browsers directly. Roughly one connection in five cannot, because a corporate firewall or a mobile carrier's address translation blocks it
- A **TURN server** relays the media instead. **Coturn** is the standard open source one

```yaml
coturn:
  image: coturn/coturn:4.6-alpine
  network_mode: host
  volumes:
    - ./coturn/turnserver.conf:/etc/coturn/turnserver.conf:ro
  restart: unless-stopped
```

### Why `network_mode: host`

- TURN allocates media on a wide range of UDP ports. Publishing thousands of ports through Docker's proxy is not workable
- `network_mode: host` removes container network isolation for this service. It is the one place in this booklet where that is the right answer, and it means the firewall is the only thing standing in front of it

```bash
sudo ufw allow 3478/tcp
sudo ufw allow 3478/udp
sudo ufw allow 49160:49200/udp
```

### The cost nobody plans for

- **A relayed call consumes bandwidth in both directions, on your box.** Two people on a video call at 1.5 Mbps each is 3 Mbps of traffic passing through the server for the whole call
- Ten simultaneous relayed calls will exhaust a modest bandwidth allowance in days. This is the item that turns a $6 VPS into an unexpected bill

### Use short-lived credentials

- A static TURN username and password in browser JavaScript is a public relay for anyone who reads it
- Coturn supports time-limited credentials derived from a shared secret. The application generates them per session
