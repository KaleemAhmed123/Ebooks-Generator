### It applies to new containers only

- Existing containers keep their old settings until recreated. After changing this, run `docker compose up -d --force-recreate`

### Check what is already on disk

```bash
sudo du -sh /var/lib/docker/containers/*/*-json.log | sort -h | tail -5
docker system df
```

- Set this on day one. Doing it after the disk fills means fixing it with no space to work in
