## Encrypted secrets in the repository

- The gap this fills: a rebuild needs `.env`, but `.env` cannot be committed
- **SOPS** encrypts values inside a file while leaving keys readable. **age** is the encryption backend

```bash
sudo apt install -y age
curl -LO https://github.com/getsops/sops/releases/latest/download/sops-v3.10.2.linux.amd64
sudo install sops-v3.10.2.linux.amd64 /usr/local/bin/sops
```

### Generate a key

```bash
age-keygen -o ~/.config/sops/age/keys.txt
# Public key: age1ql3z7hjy54pw3hyww5ayyfg7zqgvc7w3j2elw8zmrj2kg5sfn9aqmcac8p
```

- The public key encrypts. The private key decrypts and **must be stored somewhere other than this server**, in a password manager

### Encrypt

```bash
sops --encrypt --age age1ql3z7... .env > .env.enc
git add .env.enc && git commit -m "add encrypted production env"
```

```text
DATABASE_URL=ENC[AES256_GCM,data:9xK2...,type:str]
JWT_SECRET=ENC[AES256_GCM,data:pQ7m...,type:str]
```

- Keys stay readable, so a diff shows **which** secret changed without revealing any value
