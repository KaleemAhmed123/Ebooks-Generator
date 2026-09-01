## A user that is not root

- Working as `root` means every typo is unrecoverable and every compromised process owns the machine
- Create one human account, give it `sudo`, and stop using `root` directly

```bash
sudo adduser kaleem
# prompts for a password, then some optional fields that can be left blank

sudo usermod -aG sudo kaleem
```

- `-aG` appends to a group without removing existing ones. Forgetting `-a` removes the user from every other group, which is how people lose their own account

### Confirm before relying on it

```bash
su - kaleem
sudo whoami
# root
```

### The separate idea: a service account

- The human account is for administration. The application should not run under it either
- Applications get their own account with no login shell, owning only what they need

```bash
sudo useradd --system --shell /usr/sbin/nologin --home /srv/app appuser
sudo mkdir -p /srv/app && sudo chown -R appuser:appuser /srv/app
```

- With Docker this matters less on the host and more inside the image. Page 05-14 covers the container side
