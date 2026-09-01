### The rules

- **`set -euxo pipefail` first.** Without `-e` the script continues past a failure and the instance joins the load balancer broken
- **The credentials come from the instance role**, so no key appears anywhere in the script
- **User data is visible in the instance metadata to anything running on the box.** Never put a secret in it

### Debugging it

```bash
sudo cat /var/log/cloud-init-output.log      # where the script output goes
curl -s http://169.254.169.254/latest/user-data
```

- **Prefer baking a machine image.** A script that installs packages at boot makes every scale-up slow and depends on repositories being up
