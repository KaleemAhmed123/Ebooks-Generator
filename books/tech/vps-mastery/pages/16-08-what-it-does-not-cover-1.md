## What the rebuild does not cover

| Failure | Why the rebuild does not help |
|---|---|
| The backup was corrupt | Restoring reproduces the corruption. Page 12-07 |
| Data deleted by a bug three weeks ago | Every retained snapshot already has it |
| Ransomware that reached the backups | If the server can delete backups, so can an intruder |
| The GitHub account is lost | Code and images both live there |
| The domain expired | Nothing resolves to any server |
| Provider account suspended | The new box cannot be created there either |

### Backups the server cannot delete

- The restic credentials on the box can delete the repository. A compromise that reaches root reaches them

```bash
restic init --repo s3:... 
```

- Use an append-only key, or object storage with versioning and a retention lock
- Backblaze B2 application keys can be created without delete permission. Cloudflare R2 supports object lock. **Either one turns a backup into something an intruder cannot remove**

### Keep a second copy of the critical parts

- A copy of the repository somewhere other than GitHub. `git clone --mirror` to a second host takes a minute
- Images can be rebuilt from source, so they are the least critical item on the list
