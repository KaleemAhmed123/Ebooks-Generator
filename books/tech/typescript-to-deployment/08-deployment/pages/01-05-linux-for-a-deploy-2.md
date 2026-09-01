### The firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80,443/tcp
sudo ufw enable
sudo ufw status verbose
```

- On AWS the security group does this job at the network level, and the host firewall is a second layer rather than the only one
