## SSH keys

- A key pair is two files. The **private key** stays on the laptop and is never copied anywhere. The **public key** is installed on every server that should accept it
- Keys replace passwords because a password can be guessed and a 256-bit key cannot

### Generate on the laptop, not the server

```bash
ssh-keygen -t ed25519 -C "kaleem laptop"
# writes ~/.ssh/id_ed25519 and ~/.ssh/id_ed25519.pub
```

- `ed25519` is the current default. Faster and shorter than RSA, and supported everywhere that matters
- **Set a passphrase.** It encrypts the private key at rest. The agent below means it is typed once per session, not once per connection

### Install the public key on the server

```bash
ssh-copy-id kaleem@203.0.113.10
```

- Without `ssh-copy-id`, do it by hand:

```bash
ssh kaleem@203.0.113.10 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && \
  cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys" \
  < ~/.ssh/id_ed25519.pub
```

- Permissions are enforced. `~/.ssh` must be `700` and `authorized_keys` must be `600`, or sshd silently ignores the file

### Test in a second terminal

```bash
ssh kaleem@203.0.113.10
```
