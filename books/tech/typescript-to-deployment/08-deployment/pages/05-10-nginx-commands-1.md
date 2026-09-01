## Command reference: Nginx

### Control

```bash
sudo nginx -t                       # test the configuration
sudo nginx -T                       # test and print the whole merged config
sudo systemctl reload nginx         # apply, without dropping connections
sudo systemctl restart nginx        # full restart, drops connections
sudo nginx -s reload                # the same reload, without systemd
sudo nginx -s quit                  # graceful shutdown
nginx -v                            # version
nginx -V                            # version, plus every compiled module
```

- **`nginx -T` is the debugging command.** It prints the fully merged configuration with every `include` expanded, which is where surprises live

### Logs

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn   # status codes
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head   # top clients
grep ' 5[0-9][0-9] ' /var/log/nginx/access.log | tail -50
```
