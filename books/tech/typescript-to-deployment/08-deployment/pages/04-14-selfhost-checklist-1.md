## The self-hosting checklist

- Walk this before putting anything in this module in front of real data

### Every service

- [ ] Image tag pinned to a major version, never `latest`
- [ ] `restart: unless-stopped`
- [ ] A memory limit, and the sum leaves 20 percent free
- [ ] Log driver limits set, or the disk fills
- [ ] A health check, so `depends_on` and deploys work
- [ ] **No `ports:` entry**, or bound to `127.0.0.1` only
- [ ] Credentials from `.env` at mode 600, not in the compose file

### Data

- [ ] A bind mount under one backup path
- [ ] A scheduled dump, using the service's own tool
- [ ] The backup leaves the machine, encrypted
- [ ] **A restore has actually been performed**, and timed
- [ ] A dead-man alert if the backup stops running

### Access

- [ ] Every admin interface behind a tunnel or a private network
- [ ] `ss -tulpn | grep -v 127.0.0.1` shows only 22, 80, 443
- [ ] An application user per service, root credentials stored away
