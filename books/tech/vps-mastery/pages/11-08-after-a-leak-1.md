## After a secret leaks

- Assume it is compromised the moment it left a controlled place. Removing the commit does not remove the secret

### Deleting a commit does not help

```bash
git reset --hard HEAD~1
git push --force
```

- GitHub keeps unreachable commits accessible by hash for a period, forks retain them, and any scraper that saw the push already has it
- **Rotate first. Clean history second, and only for tidiness**

### The order

1. **Revoke.** Invalidate the credential at its source. A revoked key is inert wherever it has spread
2. **Issue a replacement** and deploy it
3. **Look for use.** Provider audit logs, database connection logs, unexpected outbound traffic
4. **Then** clean the history, if the repository is public

### Cleaning history

```bash
pip install git-filter-repo
git filter-repo --path .env --invert-paths
git push --force --all
```

- This rewrites every commit hash. Everyone with a clone must re-clone. Coordinate before running it
