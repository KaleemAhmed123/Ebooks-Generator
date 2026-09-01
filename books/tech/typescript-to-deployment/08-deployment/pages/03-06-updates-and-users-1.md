## Staying patched

- A server nobody updates accumulates known vulnerabilities. **Nobody remembers to update a server**, so it has to be automatic

```bash
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

```bash
# /etc/apt/apt.conf.d/50unattended-upgrades
Unattended-Upgrade::Allowed-Origins {
  "${distro_id}:${distro_codename}-security";
};
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "04:00";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
```

```bash
unattended-upgrade --dry-run --debug        # see what it would do
cat /var/log/unattended-upgrades/unattended-upgrades.log
```

- **Security origins only.** Automatically upgrading everything on a production box is how a working service breaks at 3am
- **Automatic reboot is the right default on a single box** if you have `restart: unless-stopped` on every container. Without that, a reboot is an outage that lasts until someone notices

### Kernel updates without a reboot

```bash
apt install -y needrestart
needrestart -r l                      # list what needs restarting
cat /var/run/reboot-required 2>/dev/null
```

- Livepatch services exist for the kernel. **On one box, a 4am reboot window is simpler and free**
