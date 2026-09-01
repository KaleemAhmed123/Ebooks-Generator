## Navigation and looking around

```bash
pwd                     # /srv/app          which directory is this
ls -lah                 # long, all, human sizes
cd /etc/nginx           # absolute path
cd ..                   # one level up
cd -                    # back to the previous directory
cd                      # home
```

### Reading `ls -l` output

```text
-rw-r----- 1 appuser appuser 1.2K Aug 30 09:14 .env
drwxr-xr-x 3 root    root    4.0K Aug 30 09:02 nginx
```

| Field | Meaning |
|---|---|
| First character | `-` file, `d` directory, `l` symlink |
| Next nine | Permissions, three groups of three |
| Number | Hard link count. Ignore it |
| `appuser appuser` | Owning user, owning group |
| `1.2K` | Size |

### Finding things

```bash
find /srv -name "*.yml"              # by name
find /var/log -size +100M            # by size
find /srv -mtime -1                  # changed in the last day
which docker                         # /usr/bin/docker
du -sh /var/lib/docker/*             # what is big in here
```

### Tab completion

- Pressing Tab completes a path. Pressing it twice lists the options. It is the difference between typing paths and guessing them
