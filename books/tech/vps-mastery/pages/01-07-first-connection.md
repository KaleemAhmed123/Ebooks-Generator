## The first connection

- The provider panel gives a public IP address, and either a root password or an SSH key it installed for you
- **SSH** (Secure Shell) is an encrypted terminal session to a remote machine. It is the only way in

```bash
ssh root@203.0.113.10
```

- With a key installed, the session opens with no prompt
- With a password, the prompt appears. **Nothing echoes while typing a password on Linux, not even asterisks.** Type it and press Enter

### The fingerprint prompt

```text
The authenticity of host 203.0.113.10 cannot be established.
ED25519 key fingerprint is SHA256:9pXkQ2...
Are you sure you want to continue connecting (yes/no)?
```

- This appears once per machine. It records the server identity in `~/.ssh/known_hosts`
- Compare it against the fingerprint shown in the provider panel before typing `yes`. Skipping the check is common practice, and is also how an interception succeeds

### When the fingerprint changes later

- Either the box was rebuilt, or something is wrong. After a deliberate rebuild, drop the stale entry:

```bash
ssh-keygen -R 203.0.113.10
```
