## Buffering and uploads

### Upload size

```nginx
client_max_body_size 50M;
```

- The default is 1 MB. Anything larger returns `413 Request Entity Too Large` before the backend sees a byte
- Set it at `http` level for a sane default, and raise it only on the location that accepts uploads

```nginx
location /api/catalog/images {
    client_max_body_size 25M;
    proxy_pass http://catalog_service;
}
```

### Request buffering

```nginx
proxy_request_buffering on;      # default
```

- On: Nginx reads the whole upload to disk, then sends it to the backend in one go. The backend is protected from slow clients
- Off: bytes stream through as they arrive. Needed for progress reporting and for very large files, at the cost of holding a backend worker for the whole upload
