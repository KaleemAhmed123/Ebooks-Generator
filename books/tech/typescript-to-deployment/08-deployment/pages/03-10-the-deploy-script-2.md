### What each part is doing

- **`set -euo pipefail` first.** Without `-e` the script continues past a failure and reports success
- **Migrations run as a one-off container**, not on application start, so two replicas cannot race. Module 10 covers why
- **`--wait` blocks on the health check** and returns non-zero if it never passes
- **The curl loop verifies from outside the container**, which catches a health check that passes while the port is not actually reachable
- **The rollback is redeploying the previous tag.** It takes seconds because the image is already on the box

### Calling it from CI

```yaml
      - run: ssh deploy@${{ secrets.HOST }} "/srv/app/deploy.sh ${{ github.sha }}"
```

- **Use a deploy key restricted to that one command** in `authorized_keys`, so a leaked CI key cannot open a shell
