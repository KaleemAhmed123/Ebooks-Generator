## Cheatsheet: SSH, copying, tunnels

### Keys

```bash
ssh-keygen -t ed25519 -C 'kaleem@laptop'        # ed25519, not RSA
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@host
ssh-add -l                                      # what the agent holds
ssh-keygen -lf ~/.ssh/id_ed25519.pub            # fingerprint
```

### The config file that removes all the typing

```text
# ~/.ssh/config
Host prod
  HostName 203.0.113.10
  User deploy
  IdentityFile ~/.ssh/id_ed25519
  ServerAliveInterval 30
  ServerAliveCountMax 3

Host db
  HostName 10.0.20.5
  User deploy
  ProxyJump prod              # reach a private host through the public one
```

```bash
ssh prod                      # instead of the whole line
ssh prod 'docker ps'          # run one command and exit
```

### Copying

```bash
scp ./dist.tar.gz prod:/tmp/
scp prod:/var/log/app.log ./
rsync -avz --delete ./public/ prod:/srv/app/public/     # only what changed
rsync -avz --exclude node_modules ./ prod:/srv/app/
```

- **`rsync` over `scp` for anything repeated.** It transfers only differences and can resume
- **The trailing slash on `./public/` matters.** Without it, rsync copies the directory itself into the target
