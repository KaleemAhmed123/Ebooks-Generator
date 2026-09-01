## Cheatsheet: the recovery runbook

### Before anything, confirm the diagnosis

```bash
ping -c3 203.0.113.10
ssh -o ConnectTimeout=5 kaleem@203.0.113.10 uptime
# check the provider status page and the account for a suspension notice
```

- A reboot from the provider panel fixes more incidents than a rebuild does. Try it first

### Have these open

```text
[ ] VPS provider panel
[ ] DNS provider
[ ] Password manager, unlocked
[ ] GitHub
[ ] restic credentials
```
