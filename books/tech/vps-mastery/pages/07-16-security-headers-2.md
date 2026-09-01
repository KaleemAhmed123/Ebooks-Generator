### Content-Security-Policy

- The strongest header and the one most likely to break the site

```nginx
add_header Content-Security-Policy "default-src 'self'; img-src 'self' data: https:; script-src 'self'" always;
```

- Deploy it in report-only mode first, watch what it would have blocked, then enforce:

```nginx
add_header Content-Security-Policy-Report-Only "default-src 'self'" always;
```

### Checking

```bash
curl -sI https://example.com | grep -iE "strict|x-frame|x-content|referrer"
```
