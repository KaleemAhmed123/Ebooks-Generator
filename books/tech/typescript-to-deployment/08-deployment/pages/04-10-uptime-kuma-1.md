## Uptime monitoring and the status page

- **A check that runs on the box cannot tell you the box is down.** Uptime monitoring has to run somewhere else, and that is the whole point of it
- **Uptime Kuma** is the standard self-hosted answer: HTTP, TCP, ping, DNS, certificate expiry, and a public status page

```yaml
  uptime-kuma:
    image: louislam/uptime-kuma:2
    restart: unless-stopped
    volumes:
      - ./data/uptime-kuma:/app/data
      - /var/run/docker.sock:/var/run/docker.sock:ro   # optional: watch containers
    ports: ["127.0.0.1:3001:3001"]
```

- **Run it on a different machine from the thing it watches.** A cheap second VPS in another region, or a free tier somewhere
- Mounting the Docker socket read-only lets it watch container state directly. **It is still a root-equivalent mount**, so only do it if the box is not the production one
