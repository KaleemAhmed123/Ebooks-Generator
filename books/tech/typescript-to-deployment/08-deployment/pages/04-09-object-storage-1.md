## Object storage

- Uploads, exports and backups do not belong on the application filesystem. **MinIO speaks the S3 API**, so the same AWS SDK code from Booklet 7 works unchanged

```yaml
  minio:
    image: minio/minio:latest
    restart: unless-stopped
    command: server /data --console-address ':9001'
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER:?}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD:?}
    volumes: ["./data/minio:/data"]
    ports: ["127.0.0.1:9001:9001"]        # console, loopback only
    healthcheck:
      test: ["CMD", "mc", "ready", "local"]
      interval: 20s
```

```ts
const s3 = new S3Client({
  endpoint: "http://minio:9000",
  region: "us-east-1",              // required, and ignored
  forcePathStyle: true,             // MinIO does not do virtual-host style
  credentials: { accessKeyId: env.MINIO_KEY, secretAccessKey: env.MINIO_SECRET },
})
```

- **`forcePathStyle: true` is required.** Without it the SDK builds `bucket.minio:9000` and DNS fails

```bash
mc alias set local http://minio:9000 "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD"
mc mb local/uploads
mc anonymous set none local/uploads          # private, always
mc admin user add local appuser "$APP_SECRET"
mc admin policy attach local readwrite --user appuser
mc mirror --watch local/uploads b2/offsite   # continuous replication offsite
```
