## The rebuild, step by step - continued

```bash
# --- 5. application ---                              ~3 min
echo "IMAGE_TAG=$(cat .last-good-tag)" > .env.tag
COLOR=blue docker compose -p app-blue -f app/docker-compose.yml up -d
echo blue > .active-color

# --- 6. DNS ---                                      ~5 min
# update the A records to 203.0.113.44, then wait for the TTL

# --- 7. TLS and edge ---                             ~4 min
sudo certbot certonly --standalone -d example.com -d www.example.com -d api.example.com
./scripts/write-color.sh blue
docker compose -p app-edge -f edge/docker-compose.yml up -d

# --- 8. verify ---                                   ~2 min
curl -sI https://example.com | head -1
curl -fsS https://api.example.com/readyz
```

- `--standalone` in step 7 works because Nginx is not running yet. It binds port 80 itself
