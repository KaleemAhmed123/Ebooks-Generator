## Getting backups off the box

- A backup on the same disk as the data protects against a bad migration. It protects against nothing else
- **The disk dies, the provider suspends the account, the box is deleted by mistake.** In every one of those, a local backup is gone with the original

### restic

- Encrypted, deduplicated, incremental, and it speaks S3, SFTP and local paths

```bash
sudo apt install -y restic
restic self-update
```

```bash
export RESTIC_REPOSITORY="s3:s3.eu-central-1.amazonaws.com/kaleem-backups"
export RESTIC_PASSWORD_FILE=/root/.restic-password
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...

restic init
```

- **The repository password is not recoverable.** Lose it and every backup is permanently unreadable. It belongs in a password manager, alongside the age key from page 11-04

### Back up

```bash
restic backup /srv/app/backups /srv/app/.env --tag nightly
```

- Deduplication means the second run of an almost-identical database dump uploads only the changed blocks. Thirty nightly snapshots of a 2 GB database can occupy under 10 GB
