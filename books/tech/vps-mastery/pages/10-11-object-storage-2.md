### Self-hosted or hosted

| | MinIO on the box | Hosted (S3, R2, Spaces) |
|---|---|---|
| Cost | Included in the VPS | Per gigabyte, plus egress |
| Backup | Your problem | Built in, and usually replicated |
| Disk pressure | Competes with the database | None |
| Serving files | Through Nginx, using your bandwidth | Through their edge |
| Survives the box dying | Only if backed up off-box | Yes |

- **Hosted object storage is the one part of this stack worth paying for.** It removes the largest and least compressible thing from the backup, and it survives the server
- Cloudflare R2 charges nothing for egress, which matters for user-visible images

### Never proxy large files through the application

- The application should issue a **presigned URL** and let the client upload or download directly
- Streaming a 200 MB file through a Node process holds memory and a worker for the whole transfer
