### The name resolves, the site does not load

- DNS is then correct and the problem is elsewhere. Confirm in order:

```bash
dig +short example.com          # 203.0.113.10  correct address
nc -zv 203.0.113.10 443         # is the port open
curl -I https://example.com     # what does Nginx say
curl -I -H "Host: example.com" http://203.0.113.10   # bypass DNS entirely
```

- The last command proves whether Nginx serves the right site when the name is taken out of the question
