## The configuration tree

```text
/etc/nginx/
├── nginx.conf              # the top-level file. Includes the rest
├── conf.d/*.conf           # included inside http {}
├── sites-available/        # every site, active or not
├── sites-enabled/          # symlinks to the active ones
├── snippets/               # reusable fragments
└── mime.types
```

### The three blocks that matter

```nginx
# top level, outside everything
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    # everything web-related. Upstreams, gzip, log format, rate limit zones
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;

    server {
        # one site
        location / {
            # one route
        }
    }
}
```
