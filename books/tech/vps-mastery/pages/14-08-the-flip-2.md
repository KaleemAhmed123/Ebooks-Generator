### Test before reloading, always

- `nginx -t` on a generated file catches the case where the alias does not resolve yet:

```text
nginx: [emerg] host not found in upstream "orders-green"
```

- Without the test, a reload with a bad upstream leaves the old config running, which is safe, and produces a deploy that reports success while nothing changed

### Verify the flip landed

```bash
curl -sI https://example.com/api/version | grep -i x-app-version
# x-app-version: 7f3a91c
```

- Have every service return its build tag in a header. It is two lines of code and the fastest possible answer to "did the deploy actually take"
