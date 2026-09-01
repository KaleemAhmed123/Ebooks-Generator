## Zero downtime on one machine

- The script on the last page stops the old container before the new one is ready. **On a small service that is two seconds of 502s**, and often that is acceptable
- When it is not, the pattern is the same as Part Four: **start the new one, wait for healthy, shift traffic, then stop the old one**

### The simple version: two replicas

```bash
docker compose up -d --no-deps --scale api=2 --no-recreate api
```

- **Caddy and Nginx both load balance across containers resolved by name**, so two replicas means one can restart while the other serves
- Needs the application to be stateless, which Module 1 already required
