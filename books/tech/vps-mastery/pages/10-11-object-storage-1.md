## Object storage

- Uploaded files must not live in a container's writable layer, and putting them on a volume ties them to this one machine

```yaml
minio:
  image: minio/minio
  command: server /data --console-address ":9001"
  environment:
    MINIO_ROOT_USER: ${MINIO_USER:?required}
    MINIO_ROOT_PASSWORD: ${MINIO_PASSWORD:?required}
  volumes:
    - miniodata:/data
  healthcheck:
    test: ["CMD", "mc", "ready", "local"]
    interval: 20s
    retries: 5
  networks: [internal]
  restart: unless-stopped
```

- **MinIO speaks the S3 API**, so the same client library works against it and against a hosted provider later. Switching is a change of endpoint and credentials
