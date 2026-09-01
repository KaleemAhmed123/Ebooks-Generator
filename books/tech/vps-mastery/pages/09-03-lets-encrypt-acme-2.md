### Always test against staging first

```bash
sudo certbot certonly --dry-run --nginx -d example.com
```

- The staging environment has far higher limits and issues an untrusted certificate. Use it until the command succeeds, then drop `--dry-run`

### Certificates are logged publicly

- Every issued certificate appears in Certificate Transparency logs. A certificate for `staging-internal.example.com` publishes that hostname to anyone watching. Use a wildcard if internal names should stay private
