## The production checklist

### The server

- [ ] Ubuntu LTS, fully patched, `unattended-upgrades` enabled
- [ ] Root login and password login both disabled
- [ ] A non-root user with `sudo`, and an SSH key
- [ ] `ufw` active: only 22, 80, 443
- [ ] **Scanned from a different machine.** Nothing else answers
- [ ] fail2ban running
- [ ] Swap file present, `vm.swappiness=10`
- [ ] Timezone UTC, clock synchronized

### Docker

- [ ] `daemon.json` caps log size and build cache
- [ ] Every image pins a major version. No `latest`
- [ ] Multi-stage builds, `-slim` or `-alpine` final stage
- [ ] `USER` is not root in every application image
- [ ] Every service has a `healthcheck` and a `start_period`
- [ ] `restart: unless-stopped` everywhere
- [ ] Memory limits set, and they fit the box **twice** if blue-green is used
- [ ] Databases have no `ports` entry at all
