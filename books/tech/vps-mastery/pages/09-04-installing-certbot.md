## Installing certbot

- The apt package lags. Install from snap, which is what the project recommends and which bundles the Nginx plugin

```bash
sudo snap install core && sudo snap refresh core
sudo snap install --classic certbot
sudo ln -sf /snap/bin/certbot /usr/bin/certbot
certbot --version
```

### Preconditions before requesting anything

| Check | Command |
|---|---|
| DNS resolves to this box | `dig +short example.com` |
| Port 80 open in the firewall | `sudo ufw status` |
| Nginx serving on port 80 | `curl -I http://example.com` |
| A `server_name` matching the domain exists | `sudo nginx -T \| grep server_name` |

- Certbot fails on any of these with an error that reads like a certificate problem. It is almost always one of the four above

### Alternatives

| Client | When |
|---|---|
| `certbot` | The default. Widest documentation |
| `acme.sh` | A shell script, no snap, wide DNS provider support |
| Caddy | A web server with automatic TLS built in. No certbot at all |
| `lego` | A single Go binary, good inside containers |

- Caddy is worth knowing about. It obtains and renews certificates with no configuration, and for a single-box deployment that removes this entire module. It is not used here because Nginx is what most existing configurations are written in
