## Compression and static caching

### gzip

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_proxied any;
gzip_comp_level 5;
gzip_types
    text/plain text/css text/javascript
    application/javascript application/json
    application/xml image/svg+xml;
```

- `gzip_vary on` adds `Vary: Accept-Encoding`, without which a proxy can serve a compressed body to a client that cannot read it
- `gzip_min_length 1024` avoids compressing tiny responses, where the header costs more than the saving
- **Do not compress images or video.** JPEG, PNG, WebP and MP4 are already compressed. Recompressing burns CPU for nothing
