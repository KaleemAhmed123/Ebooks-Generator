### Running your own

```bash
docker run -d -p 5000:5000 --name registry \
  -v registry-data:/var/lib/registry \
  --restart unless-stopped registry:2
```

- Fine for a private network. **For anything shared, Harbor adds authentication, scanning, replication and retention**, and Module 4 covers it
- **Put a retention policy on any registry.** Images accumulate at gigabytes per week and nothing removes them by itself
