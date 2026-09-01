## The layer cache

- Docker reuses a layer when the instruction and its inputs have not changed
- **Once one layer misses, every layer after it rebuilds.** Instruction order is therefore a performance decision

### The wrong order

```dockerfile
COPY . .
RUN npm ci          # reruns on every source change. 90 seconds, every time
```

- Any edit to any file invalidates `COPY . .`, so the install runs again

### The right order

```dockerfile
COPY package.json package-lock.json ./
RUN npm ci                    # only reruns when dependencies change
COPY . .                      # cheap
```

- Copy the files that rarely change first, then install, then copy the source

| Change | Wrong order | Right order |
|---|---|---|
| Edit one route file | Full install | Cached |
| Add a dependency | Full install | Full install |
| Change nothing | Cached | Cached |

### Combine `RUN` steps that belong together

```dockerfile
# two layers, and the apt lists are kept forever in the first one
RUN apt-get update
RUN apt-get install -y curl

# one layer, cleaned up before it is committed
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
```

- Deleting a file in a later layer does not shrink the image. The earlier layer still holds it. Clean up inside the same `RUN`
