### The explicit version: two named services

```text
api.example.com {
	reverse_proxy api-blue:3000 api-green:3000 {
		lb_policy least_conn
		health_uri /health
		health_interval 5s
		fail_duration 10s
	}
}
```

```bash
# deploy to the idle color, wait, then retire the other
TAG=$SHA docker compose up -d --wait api-green
curl -fsS http://127.0.0.1:3001/health
docker compose stop api-blue
```

- **Caddy stops sending to a container failing its health check**, so the switch happens by itself
- **`fail_duration` is how long an unhealthy backend stays out.** Without it, traffic returns to a container that is still starting

### The part people forget

- **The application must handle `SIGTERM` and finish in-flight requests**, exactly as Module 2 describes. Without it, the graceful part of this is fiction
- **`stop_grace_period` must exceed the longest request**, or Docker kills it mid-response
- **A database migration is still the real constraint.** Expand before contract, covered in Module 10, or no deployment strategy helps
