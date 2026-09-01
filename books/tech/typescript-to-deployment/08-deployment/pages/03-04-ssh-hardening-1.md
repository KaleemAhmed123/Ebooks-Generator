## SSH

- Password authentication on a public box is a brute-force target. **Keys only, no root login, and that is most of the risk gone**

```bash
# on your laptop, if you do not already have one
ssh-keygen -t ed25519 -C 'kaleem@laptop'
ssh-copy-id deploy@203.0.113.10
```

```bash
# /etc/ssh/sshd_config.d/99-hardening.conf
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
AllowUsers deploy
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
X11Forwarding no
```

```bash
sshd -t                       # test the config BEFORE restarting
systemctl restart ssh
```

- **A drop-in file under `sshd_config.d/` survives a package upgrade.** Editing `sshd_config` directly does not
- **`sshd -t` before every restart.** A syntax error plus a restart is a locked box

### Changing the port

- Moving off 22 removes almost all log noise and **adds no real security**. Do it for the quiet, not for the safety
- If you do, open the new port in the firewall first, and put it in your `~/.ssh/config`
