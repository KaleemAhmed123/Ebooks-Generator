## Cheatsheet: files, permissions, search

### Moving around and looking

```bash
ls -lah                          # long, all, human sizes
ls -lt | head                    # newest first
tree -L 2 -a                     # two levels deep
stat app.log                     # size, owner, all three timestamps
file dump.bin                    # what is this actually
readlink -f ./link               # resolve to the real path
```

### Permissions and ownership

```bash
chmod 640 /etc/app.env           # owner rw, group r, others none
chmod +x deploy.sh
chmod -R g+w /srv/app/uploads
chown -R appuser:appuser /srv/app
umask 027                        # default for new files in this shell
getfacl /srv/app                 # when plain permissions are not enough
```

| Digit | Means |
|---|---|
| `4` | read |
| `2` | write |
| `1` | execute |
| `755` | owner all, everyone else read and execute |
| `640` | owner read and write, group read. **Use for config with secrets** |
| `600` | owner only. Use for keys |
