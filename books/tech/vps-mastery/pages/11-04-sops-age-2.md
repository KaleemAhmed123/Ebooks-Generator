### Decrypt during a rebuild

```bash
export SOPS_AGE_KEY_FILE=/root/.config/sops/age/keys.txt
sops --decrypt .env.enc > .env
chmod 600 .env
```

### What this actually buys

- The rebuild in Module 16 no longer depends on remembering a dozen values. It becomes: clone the repository, decrypt, start
- The private key is now the single thing that must survive. One key in a password manager is a manageable dependency. Twenty secrets in someone's memory is not
