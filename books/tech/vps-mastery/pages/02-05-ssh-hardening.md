## Hardening sshd

- Once key login works, turn off the two things attackers rely on: root login and password login
- **Do not edit `/etc/ssh/sshd_config` directly.** Ubuntu reads drop-in files from `/etc/ssh/sshd_config.d/`, and a package upgrade can overwrite the main file

```bash
sudo nano /etc/ssh/sshd_config.d/99-hardening.conf
```

```text
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
PermitEmptyPasswords no
X11Forwarding no
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
AllowUsers kaleem
```

- `AllowUsers` is the strongest line here. Any account not listed cannot log in at all, even with a valid key

### Apply it safely

```bash
sudo sshd -t                    # syntax check, silent when correct
sudo systemctl reload ssh
```

- `reload` keeps existing sessions alive. **Keep this terminal open.** Open a second one and log in before closing it
- On Ubuntu 24.04 and later the socket unit can also matter. If a reload appears to do nothing, `sudo systemctl restart ssh.socket`

### Changing the port

- Moving off port 22 removes most log noise and stops no determined attacker. It is optional, and it breaks every default in this booklet
