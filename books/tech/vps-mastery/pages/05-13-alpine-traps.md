## The Alpine traps

- Alpine uses **musl** libc instead of **glibc**. Most things work. The exceptions cost hours

### Native modules have no prebuilt binary

- Packages shipping compiled binaries (`sharp`, `bcrypt`, `canvas`, some database drivers) publish glibc builds. On Alpine they compile from source, or fail

```text
Error: Could not load the "sharp" module using the linuxmusl-x64 runtime
```

- Fix by installing build tools in the build stage only:

```dockerfile
RUN apk add --no-cache --virtual .build python3 make g++ \
    && npm ci \
    && apk del .build
```

### DNS resolution behaves differently

- musl queries DNS servers in parallel and historically handled some search-domain and TCP fallback cases differently from glibc
- The symptom is intermittent `EAI_AGAIN` or `ENOTFOUND` for a hostname that resolves fine from the host

### Timezone data is not included

```dockerfile
RUN apk add --no-cache tzdata
```

- Without it, every date formats as UTC regardless of `TZ`. Invoice timestamps quietly shift

### `bash` is not installed

```bash
docker exec -it orders sh      # not bash
```

### When to just use slim

- Native modules in the tree, or any date handling that depends on a timezone. The 70 MB saved is not worth a build that fails only in CI
