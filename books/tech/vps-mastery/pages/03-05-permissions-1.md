## Permissions

- Every file carries three permissions for three audiences: **owner**, **group**, **everyone else**

```text
-rw-r-----
 │└┬┘└┬┘└┬┘
 │ │  │  └── others: nothing
 │ │  └───── group:  read
 │ └──────── owner:  read, write
 └────────── a regular file
```

| Digit | Means |
|---|---|
| `4` | read |
| `2` | write |
| `1` | execute |
| `7` | read, write, execute |
| `755` | owner everything, everyone else read and execute |
| `644` | owner read and write, everyone else read |
| `640` | owner read and write, group read. **Use for config holding secrets** |
| `600` | owner only. Use for keys and `.env` |
| `700` | owner only, directories |

```bash
chmod 600 /srv/app/.env
chmod +x deploy.sh
chmod -R 755 /srv/app/public
```
