## Users, groups, sudo

```bash
whoami                  # kaleem
id                      # uid=1000(kaleem) gid=1000(kaleem) groups=...,27(sudo),988(docker)
groups kaleem           # kaleem sudo docker
sudo -l                 # what this user may run as root
```

### Adding and removing group membership

```bash
sudo usermod -aG docker kaleem      # add
sudo gpasswd -d kaleem docker       # remove
```

- Group changes apply at next login. `newgrp docker` picks them up in the current shell

### sudo without a password, for one command

- Needed by deploy scripts that must reload Nginx. Never grant blanket passwordless sudo

```bash
sudo visudo -f /etc/sudoers.d/deploy
```

```text
kaleem ALL=(root) NOPASSWD: /usr/sbin/nginx -t, /bin/systemctl reload nginx
```

- `visudo` validates syntax before saving. Editing `/etc/sudoers` with `nano` and getting it wrong locks out `sudo` entirely

### Membership in `docker` is root

- Anyone in the `docker` group can start a container that mounts the whole host filesystem. That is full root access by another name
- Treat `docker` group membership as equivalent to being in `sudo`, because it is
