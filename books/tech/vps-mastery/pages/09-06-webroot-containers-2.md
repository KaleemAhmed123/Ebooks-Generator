### The reload problem

- A renewed certificate on disk changes nothing until Nginx re-reads it. The container will not notice by itself

```bash
sudo nano /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
```

```bash
#!/usr/bin/env bash
set -euo pipefail
cd /srv/app
docker compose exec -T nginx nginx -s reload
```

```bash
sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
```

- Scripts in `renewal-hooks/deploy/` run **only after a successful renewal**, which is exactly when the reload is needed
- Without this hook the site serves an expired certificate roughly 60 days after the last manual reload, and nothing in the logs will say why
