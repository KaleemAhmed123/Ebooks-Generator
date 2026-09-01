### Password on the command line

- The command above puts the password in the process list, visible to `ps` for other users on the box
- Read it from the environment inside the container instead:

```bash
docker compose exec -T mongo sh -c \
  'mongodump --archive --gzip --uri="mongodb://root:$MONGO_INITDB_ROOT_PASSWORD@localhost:27017/?authSource=admin"' \
  > backup.archive.gz
```

- Single quotes matter. They stop the host shell expanding the variable before the container sees it
