## Health gating before the flip

- The new stack must prove itself before any user reaches it. Two checks, in order

### 1. Every container reports healthy

```bash
wait_healthy() {
  local project="$1" deadline=$((SECONDS + 180))
  while [ $SECONDS -lt $deadline ]; do
    local ids unhealthy=0
    ids=$(docker compose -p "$project" ps -q)
    for id in $ids; do
      status=$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "$id")
      case "$status" in
        healthy|none) ;;
        *) unhealthy=1 ;;
      esac
    done
    [ "$unhealthy" -eq 0 ] && return 0
    sleep 3
  done
  return 1
}
```

- `none` covers containers with no health check defined. Treating them as failures would block forever
