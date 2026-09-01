### On a directory, execute means "may enter"

- A directory with `644` cannot be entered, only listed. This is why directories are `755` and files are `644`

### The one to never type

```bash
chmod -R 777 /srv/app     # every user on the box can rewrite the app
```

- `777` appears in tutorials as a fix for a permission error. It replaces the error with a vulnerability. Find the correct owner instead
