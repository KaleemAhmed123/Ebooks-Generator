## The clone, and where it lives

```bash
sudo mkdir -p /srv/app
sudo chown kaleem:kaleem /srv/app
cd /srv/app
git clone git@github-marketplace:kaleem/marketplace.git .
```

- The trailing `.` clones into the current directory rather than creating a nested one

### Why `/srv/app` and not the home directory

- `/srv` is the conventional location for data this machine serves. Home directories carry a user's permissions and get deleted with the user
- Any consistent path works. Consistency is the point, because Module 16 rebuilds this exact path

### A shallow clone, when history is not needed

```bash
git clone --depth 1 git@github-marketplace:kaleem/marketplace.git .
```

- Downloads only the latest commit. On a large repository this is the difference between 800 MB and 30 MB
- The cost: `git log` shows one entry, and rolling back to an older commit needs a fetch first

### Confirm what is checked out

```bash
git rev-parse --short HEAD     # 7f3a91c
git status --short             # empty means clean
git log -1 --format="%h %s (%an, %ar)"
# 7f3a91c fix payout rounding on partial refunds (Rabiya, 3 hours ago)
```

- Record that commit hash somewhere. It is the answer to "what is actually running right now"
