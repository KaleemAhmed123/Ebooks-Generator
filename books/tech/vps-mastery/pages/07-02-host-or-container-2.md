### What this booklet does

- **Module 7 uses host Nginx**, because it is the shortest path to a working site with TLS
- **Part Four switches to container Nginx**, because fifteen services publishing fifteen loopback ports is worse than one mounted config

```yaml
nginx:
  image: nginx:1.28-alpine
  ports: ["80:80", "443:443"]
  volumes:
    - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    - /etc/letsencrypt:/etc/letsencrypt:ro
```

- These are the only ports published to `0.0.0.0` anywhere in the stack
