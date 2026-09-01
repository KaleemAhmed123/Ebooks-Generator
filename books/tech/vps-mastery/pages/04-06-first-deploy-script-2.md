### `--ff-only`

- Refuses to create a merge commit on the server. If the checkout has diverged from the remote, the pull fails loudly instead of merging silently

```text
fatal: Not possible to fast-forward, aborting.
```

- That message means someone edited files on the box. Page 04-05 covers recovering from it

### Run it and read the output

```bash
./deploy.sh
# deploying 6b2d40e -> latest
# Already up to date.
# [+] Building 92.4s (24/24) FINISHED
# [+] Running 3/3
#  ✔ Container app-postgres-1  Healthy
#  ✔ Container app-api-1       Started
# now running 7f3a91c
```

### What this script still gets wrong

| Problem | Fixed by |
|---|---|
| The build runs on the production box | Module 13 |
| Downtime between `build` and `up` | Module 14 |
| No check that the new version actually works | Module 13 |
| No way back if it does not | Module 14 |
| Two people can run it at once | Page 13-12 |

- It is still a large improvement over typing four commands from memory, and it is the right starting point. Everything after this replaces one line of it at a time
