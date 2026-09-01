### Retention

```bash
restic forget --prune \
  --keep-daily 7 --keep-weekly 4 --keep-monthly 6
```

| Kept | Covers |
|---|---|
| 7 daily | An error noticed within a week |
| 4 weekly | A slow-moving data problem |
| 6 monthly | Compliance, and the corruption nobody spotted |

### Where to send it

- **Not the same provider as the server.** A suspended account takes both. Backblaze B2 and Cloudflare R2 are cheap and separate
