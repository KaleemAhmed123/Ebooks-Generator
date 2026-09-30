## Linux, the bits that matter

- Almost every training server and cloud GPU runs **Linux**. You do not need to master it — you need enough to move around, manage files, and not get stuck.
- On Windows, the cleanest path is **WSL** (Windows Subsystem for Linux): a real Linux environment inside Windows, so your local setup matches the servers you deploy to.

### The concepts that trip beginners

- **The filesystem is a single tree** from `/`. Your files live under `/home/you`. There are no `C:` drives.
- **Permissions.** Files have read/write/execute flags. `chmod +x script.sh` makes a script runnable; a "permission denied" usually means a missing execute bit or a protected path.
- **Environment variables** configure programs without code changes — `PATH` (where to find commands), `CUDA_VISIBLE_DEVICES` (which GPUs a job may use).
- **Package manager** installs system software: `apt install` on Ubuntu, the standard cloud distribution.

:::mint
```bash
export CUDA_VISIBLE_DEVICES=0    # restrict this job to GPU 0
echo $PATH                       # see where commands are searched for
df -h                            # check free disk space
```
:::

:::note
`CUDA_VISIBLE_DEVICES` is worth remembering early. On a multi-GPU box it decides which GPUs your program can touch — the simplest way to run two experiments side by side without them fighting over the same card.
:::
