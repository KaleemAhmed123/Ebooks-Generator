## Versions this booklet uses

- Pinned as of August 2026. Check for a newer patch release before copying a version string into production

| Component | Version | Note |
|---|---|---|
| Ubuntu | 26.04 LTS | 24.04 LTS also fine |
| Docker Engine | 28.x | From Docker's own apt repository |
| Docker Compose | v2 plugin | Invoked as `docker compose`, not `docker-compose` |
| Node.js | 24 LTS | Active LTS. Node 22 is maintenance-only, Node 18 is end of life |
| Nginx | 1.28 stable | The branch Ubuntu packages track |
| PostgreSQL | 18 | 18.6 at time of writing |
| MongoDB | 8 | |
| Redis | 8 | |
| RabbitMQ | 4.3 | 4.2 reached end of life in July 2026 |
| Certbot | snap channel | Bundles the Nginx plugin |
| Prometheus | 3.x | |
| Grafana | 12.x | |
| Loki | 3.x | Promtail is deprecated. Grafana Alloy replaces it |

### Two version rules

- **Pin the major, float the patch.** `postgres:18-alpine`, not `postgres:latest` and not `postgres:18.6-alpine`
- **Never run `latest` in production.** A rebuild six months later silently jumps a major version, and the migration fails at the worst moment
