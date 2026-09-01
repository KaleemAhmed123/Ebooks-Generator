## Deploy keys, not personal keys

- A private repository needs credentials on the server. The wrong move is generating a key on the box and adding it to a personal GitHub account
- That key can then read and write **every repository the account can reach**. A compromised server becomes a compromised organization

### A deploy key is scoped to one repository

- Generate on the server, read-only, no passphrase because nothing can type one at boot

```bash
ssh-keygen -t ed25519 -f ~/.ssh/deploy_marketplace -N "" -C "prod-1 deploy key"
cat ~/.ssh/deploy_marketplace.pub
```

- In GitHub: **repository** Settings, Deploy keys, Add deploy key. Paste it. **Leave "Allow write access" unchecked**

### Telling SSH which key to use

- With more than one repository, name each explicitly in `~/.ssh/config`:

```text
Host github-marketplace
  HostName github.com
  User git
  IdentityFile ~/.ssh/deploy_marketplace
  IdentitiesOnly yes
```

- `IdentitiesOnly yes` stops SSH offering every key it has, which is what causes `Too many authentication failures`

```bash
git clone git@github-marketplace:kaleem/marketplace.git
```

### Verify

```bash
ssh -T git@github-marketplace
# Hi kaleem/marketplace! You have successfully authenticated,
# but GitHub does not provide shell access.
```
