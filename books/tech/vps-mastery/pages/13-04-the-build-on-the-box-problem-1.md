## Why building on the box hurts

- A production server is sized for serving requests. A build has a completely different shape

| | Serving | Building |
|---|---|---|
| Memory | Steady, predictable | A spike, several times higher |
| CPU | Bursty, low average | Saturated for minutes |
| Disk | Slow growth | Gigabytes of layers and cache |
| Failure | One request | The deploy, and possibly the box |

### What it looks like in practice

- Building fifteen images in sequence on a 8 GB box means each build competes with fifteen running containers
- The usual workaround is pruning between builds, which is a way of saying the disk is too small:

```bash
for s in $BACKEND_SERVICES; do
  docker build -t "marketplace/$s:latest" --build-arg SERVICE="$s" .
  docker builder prune -f      # free space before the next one
  docker image prune -f
done
```

- Every prune throws away cache the next build wanted. Deploy time grows instead of shrinking
