### The rules

- **A separate user per application, never root credentials.** Root can delete every bucket
- **`mc mirror` to a real cloud bucket.** MinIO on one box has the same single point of failure as everything else on it
- **Presigned URLs work exactly as in Part Four**, so uploads go browser to MinIO and never through your API
- **Garage** is the lighter alternative when you need a few gigabytes rather than a storage system
