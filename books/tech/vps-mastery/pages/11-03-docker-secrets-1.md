## Docker secrets

- A secret is mounted as a file inside the container rather than set as an environment variable
- It does not appear in `docker inspect`, in `docker compose config`, or in the process environment

```yaml
services:
  orders:
    image: ghcr.io/kaleem/orders:7f3a91c
    secrets:
      - db_password
      - jwt_secret
    environment:
      DB_PASSWORD_FILE: /run/secrets/db_password
      JWT_SECRET_FILE: /run/secrets/jwt_secret

secrets:
  db_password:
    file: ./secrets/db_password.txt
  jwt_secret:
    file: ./secrets/jwt_secret.txt
```

- The file appears at `/run/secrets/<name>`, read-only, owned by root, on a memory-backed filesystem
