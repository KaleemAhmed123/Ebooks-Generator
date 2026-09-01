### Deploying an older commit by accident

- Two merges, and the slower build finishes second, overwriting the newer deploy with older code

```bash
CURRENT=$(docker compose ps --format json | jq -r '.[0].Image' | cut -d: -f2)
if ! git merge-base --is-ancestor "$CURRENT" "$IMAGE_TAG"; then
  echo "$IMAGE_TAG is not newer than $CURRENT, refusing"
  exit 1
fi
```

- Refuse to deploy a commit that is not a descendant of what is running, unless a rollback flag is set
