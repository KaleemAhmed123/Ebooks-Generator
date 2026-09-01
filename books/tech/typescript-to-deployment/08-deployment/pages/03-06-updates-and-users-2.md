### Users

```bash
id deploy
getent group sudo
last -n 20                            # recent logins
lastb -n 20                           # failed logins
```

- **One human user per person, no shared accounts.** On a box with one maintainer that is one user
- **A separate `appuser` with no login shell owns the application files.** The `deploy` user administers; the app does not need a shell

```bash
useradd --system --shell /usr/sbin/nologin --home /srv/app appuser
```
