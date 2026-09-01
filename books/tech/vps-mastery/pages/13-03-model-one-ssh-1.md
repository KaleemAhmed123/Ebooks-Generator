## Model 1: SSH in and run

- The workflow connects to the box and runs the same script a human would

### A key for the pipeline only

```bash
ssh-keygen -t ed25519 -f ~/.ssh/gha_deploy -N "" -C "github actions"
```

- The **public** key goes into `~/.ssh/authorized_keys` on the server, restricted:

```text
command="/srv/app/scripts/deploy.sh",no-agent-forwarding,no-port-forwarding,no-pty,no-X11-forwarding ssh-ed25519 AAAAC3Nz...
```

- The **private** key goes into a repository secret named `DEPLOY_SSH_KEY`
- With `command=`, that key can run one script. It cannot open a shell, even though it authenticates
