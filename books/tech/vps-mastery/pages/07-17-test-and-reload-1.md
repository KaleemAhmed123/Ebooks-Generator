## Test, then reload

- **Never reload without testing.** Nginx refuses to start on a bad config, and a `restart` on a bad config leaves the site down

```bash
sudo nginx -t
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

```text
nginx: [emerg] unknown directive "proxy_passs" in /etc/nginx/sites-enabled/marketplace:24
nginx: configuration file /etc/nginx/nginx.conf test failed
```

- File and line number. Fix, test again, then apply

### reload against restart

```bash
sudo systemctl reload nginx      # correct
sudo systemctl restart nginx     # drops every connection
```

| | reload | restart |
|---|---|---|
| Existing requests | Finish normally | Killed |
| WebSocket connections | Kept until they close | Dropped |
| Downtime | None | Under a second, but real |
| Bad config | Refused, old config keeps running | Nginx stops and stays stopped |
