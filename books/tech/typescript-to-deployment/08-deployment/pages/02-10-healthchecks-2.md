### In the Dockerfile

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
```

- `--start-period` is the grace window while the process boots, during which failures do not count
- **Keep the check cheap and give it a timeout.** A health check that queries three tables becomes the load that takes the service down
- Do not put authentication on it. The load balancer has no credentials
