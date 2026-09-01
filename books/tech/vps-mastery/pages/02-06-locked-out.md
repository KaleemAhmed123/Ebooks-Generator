## Locked out

- It happens to everyone once. The causes, in order of frequency:

| Cause | Symptom |
|---|---|
| `PasswordAuthentication no` with no working key | `Permission denied (publickey)` |
| Firewall enabled without allowing SSH | Connection times out |
| Wrong permissions on `~/.ssh` | `Permission denied (publickey)`, server log says "bad ownership" |
| `AllowUsers` naming an account that does not exist | Denied for every user |
| Disk full, so sshd cannot write | Connection closes immediately after banner |

### The way back in

- Every provider has a **recovery console**, sometimes called VNC, serial console, or web console. It attaches to the virtual screen and bypasses SSH entirely
- Find it before it is needed, and confirm the root password works there. A console with an unknown password is not a recovery path

### Once inside the console

```bash
sudo nano /etc/ssh/sshd_config.d/99-hardening.conf   # undo the bad line
sudo sshd -t
sudo systemctl restart ssh
sudo ufw allow OpenSSH
```

### If the console is unusable

- Detach the disk, attach it to a second temporary instance, mount it, fix the file, reattach. Slow but reliable
- This is also the moment Module 16 pays for itself. A box that can be rebuilt in thirty minutes never needs rescuing
