### The six rules, stated plainly

1. **Pin the tag.** `latest` means a `docker compose pull` can perform a major version upgrade of your database without asking
2. **Secrets from the environment file**, mode 600, never in the compose file that lives in git
3. **A bind mount under `./data`**, so `restic backup /srv/app/data` covers everything in one line
4. **A health check**, so `depends_on: condition: service_healthy` works and a deploy can wait
5. **A memory limit**, so a runaway query does not get your API killed by the OOM killer instead
6. **Log limits**, because `json-file` is unbounded by default and this is the most common way a box dies

### The rule that matters most

- **No `ports:` entry on any backing service.** Postgres, Redis, Mongo and RabbitMQ are reachable from the application container by name
- The moment one is published, it is on the public internet, because Docker bypasses `ufw`. Module 3 covers why
- **To reach one from your laptop, use an SSH tunnel**, never a published port
