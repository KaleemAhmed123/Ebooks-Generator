## The two-container starting point - continued

```yaml
nginx:
    image: nginx:1.28-alpine
    ports: ["80:80", "443:443"]
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on: [shop-ui, api]
    restart: unless-stopped

volumes:
  pgdata:
```

- **Only Nginx publishes anything.** Everything else uses `expose`, which documents the port and opens nothing
- This runs comfortably on a 2 GB box and serves real traffic. Most projects never need more than this
