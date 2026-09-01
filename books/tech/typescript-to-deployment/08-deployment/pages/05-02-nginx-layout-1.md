## Install and the config layout

```bash
sudo apt update && sudo apt install -y nginx
sudo systemctl enable --now nginx
nginx -v            # nginx version: nginx/1.30.x
```

| Path | Holds |
|---|---|
| `/etc/nginx/nginx.conf` | the global config, worker settings, and the `http` block |
| `/etc/nginx/sites-available/` | one file per site, written by you |
| `/etc/nginx/sites-enabled/` | symlinks to the ones actually active |
| `/etc/nginx/conf.d/` | shared snippets, included automatically |
| `/var/log/nginx/access.log` | every request |
| `/var/log/nginx/error.log` | **read this first when something is wrong** |

### Enabling a site

```bash
sudo ln -s /etc/nginx/sites-available/orders /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default        # the welcome page
sudo nginx -t                                   # test before you break it
sudo systemctl reload nginx                     # no dropped connections
```

- **`nginx -t` then `reload`, never `restart`.** A reload starts new workers with the new config and lets old ones finish their requests
- **`nginx -t` before every reload.** A syntax error on reload leaves the old config running; a syntax error on restart leaves nothing running
