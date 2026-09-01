### Verify from a different machine

- Everything above can be checked from the server and still be wrong. The firewall is only proven from outside

```bash
nc -zv 203.0.113.10 22 80 443 5432 6379 27017
# only 22, 80 and 443 may succeed
```

```bash
nmap -Pn -p- --min-rate 1000 203.0.113.10 | grep open
# 22/tcp  open  ssh
# 80/tcp  open  http
# 443/tcp open  https
```

- Any other open port is a finding. On a box that has not yet had Docker installed there should be exactly one

### Confirm the lockdown actually holds

```bash
ssh root@203.0.113.10
# Permission denied (publickey).            root login is off

ssh -o PubkeyAuthentication=no kaleem@203.0.113.10
# Permission denied (publickey).            passwords are off

ssh kaleem@203.0.113.10 "sudo whoami"
# root                                      sudo still works
```

### Keep this session open

- Do not close the working terminal until all three of the above behave as expected. Page 02-06 covers what happens when they do not
