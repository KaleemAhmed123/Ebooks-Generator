## Updates, and keeping them coming

- `apt` is the Ubuntu package manager. `update` refreshes the list of available packages, `upgrade` installs them

```bash
sudo apt update && sudo apt upgrade -y
```

- The first run on a fresh box installs dozens of security patches. Some need a reboot:

```bash
[ -f /var/run/reboot-required ] && sudo reboot
```

### Automatic security updates

- Ubuntu ships `unattended-upgrades`, which is usually installed but not enabled for everything

```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

- Confirm it will actually run:

```bash
sudo unattended-upgrade --dry-run --debug | head -20
```

### Automatic reboots

- Security patches to the kernel do nothing until the machine reboots. Set a window when a restart is acceptable, in `/etc/apt/apt.conf.d/50unattended-upgrades`:

```text
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "04:00";
```

- Only turn this on once the stack restarts cleanly by itself. Module 6 covers the restart policies that make it safe
