## Renewal, and the 2026 lifetime changes

- Certificates are short-lived on purpose. A stolen key is useful for days rather than years

| Profile | Lifetime | Status as of August 2026 |
|---|---|---|
| `classic` | 90 days | Still the default |
| `tlsserver` | 45 days | Switched over in May 2026, opt-in |
| `shortlived` | About 6 days | Generally available since January 2026 |

- Industry rules cut the maximum certificate lifetime to 47 days from March 2029. **Lifetimes only get shorter.** Any process depending on a human remembering to renew is already broken

### The timer

- The certbot snap installs a systemd timer that runs twice a day and renews anything within 30 days of expiry

```bash
systemctl list-timers | grep certbot
sudo certbot renew --dry-run
# Congratulations, all simulated renewals succeeded
```

- **Run the dry run after every configuration change.** It is the only way to find a broken renewal before the certificate expires

### Requesting a shorter profile

```bash
sudo certbot certonly --nginx --preferred-profile shortlived -d example.com
```

- A 6-day certificate renews roughly daily. Only do this when the automation is proven, because there is no margin for a failed renewal
