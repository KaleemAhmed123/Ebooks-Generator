### Check what is actually enabled

```bash
ls -l /etc/nginx/sites-enabled/
# marketplace -> /etc/nginx/sites-available/marketplace
```

- A dangling symlink, shown in red, stops Nginx from starting entirely

### This layout is a Debian convention

- The `nginx:alpine` container image has no `sites-enabled` at all. It reads `/etc/nginx/conf.d/*.conf`
- Part Four uses a single mounted `nginx.conf`, which sidesteps the difference
