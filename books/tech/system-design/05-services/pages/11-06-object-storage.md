## Object storage

- Relational databases are built for tiny, structured rows. If you try to save a 50MB video file in a Postgres `BYTEA` column, you will destroy the database's cache and disk performance
- Large binary files (images, videos, backups) must be saved in Object Storage (like Amazon S3). Object storage is a flat Key-Value store where the Key is a string (like `/avatars/user-99.jpg`) and the Value is raw bytes
- S3 provides "11 nines" of durability (99.999999999%). If you store 10,000 files in S3, you can expect to lose a single file once every 10 million years. It achieves this by silently replicating your bytes across at least three physically separate datacenters

| Feature | File System (NFS) | Object Storage (S3) |
|---|---|---|
| **Structure** | Deep tree of directories | Flat list of keys |
| **API** | OS Kernel (open, seek, read) | HTTP (PUT, GET) |
| **Updates** | Can overwrite bytes in the middle | Immutable. Must overwrite the entire file |
| **Durability** | Single datacenter | Multi-datacenter by default |

### The failure

- The failure is treating Object Storage like a traditional File System. There is no concept of a "Folder" in S3, just keys that happen to have slashes in them
- There is no "Rename" command in the S3 API. To rename `/videos/funny.mp4` to `/archive/funny.mp4`, you must command S3 to make a full copy of the bytes to the new key, and then issue a second command to delete the old key
- If you build an app feature that lets users rename "folders", and a user renames a folder containing 10,000 files, your app will have to issue 20,000 separate HTTP requests to S3, which will take minutes and likely time out
