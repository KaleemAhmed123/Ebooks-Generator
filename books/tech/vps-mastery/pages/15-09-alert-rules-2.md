## Alerts worth waking up for - continued

```yaml
- alert: CertificateExpiringSoon
        expr: probe_ssl_earliest_cert_expiry - time() < 7 * 86400
        for: 1h
        labels: { severity: ticket }
```

### `predict_linear` is the useful one

- Alerting at 85% full is a fixed line. **`predict_linear` alerts when the trend says the disk fills within four hours**, which arrives with time to act and stays quiet when growth is slow

### `for` prevents the flapping

- `for: 5m` means the condition must hold for five minutes. Without it, one slow scrape sends a page

### Pin the color label

- `up{color="blue"} == 0` alerts only on the live stack. Without the label, every deploy pages someone about the drained color
