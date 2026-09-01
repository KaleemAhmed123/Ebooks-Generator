### Watch the expiry rather than trusting the timer

```bash
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
  | openssl x509 -noout -enddate
# notAfter=Nov 28 09:14:00 2026 GMT
```

- Page 15-02 puts this on the monitoring stack, which is where it belongs. A certificate expiring at 2am on a Sunday is a preventable outage
