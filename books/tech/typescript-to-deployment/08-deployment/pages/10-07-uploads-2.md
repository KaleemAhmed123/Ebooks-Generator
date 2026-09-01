### CORS, which catches everyone

```json
[{ "AllowedOrigins": ["https://app.example.com"],
   "AllowedMethods": ["PUT", "GET"],
   "AllowedHeaders": ["*"],
   "ExposeHeaders": ["ETag"] }]
```

- Without this, the browser refuses the direct upload and the error mentions nothing about S3
