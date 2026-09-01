## Static files and compression

- Serving a JavaScript bundle through Express costs an event loop turn per chunk. Nginx sends it with `sendfile` and never copies it into userspace
- **Static files should never reach Node**, and in production they should ideally never reach Nginx either, because CloudFront is in front

```nginx
location /assets/ {
  root /srv/app/public;
  expires 1y;
  add_header Cache-Control "public, immutable";
  access_log off;
}

location = /favicon.ico { root /srv/app/public; access_log off; log_not_found off; }
```

- **`immutable` with a one year expiry is correct only for fingerprinted filenames** such as `app.9f2b1c.js`. On a stable name it serves a stale file for a year

### Compression

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_proxied any;
gzip_types text/plain text/css application/json application/javascript
           application/xml image/svg+xml;

brotli on;                     # needs the brotli module
brotli_types text/plain text/css application/json application/javascript;
```

- **`gzip_vary on` is required**, or a cache serves a compressed body to a client that cannot read it
- **Never compress images or video.** They are already compressed and it wastes CPU on both ends
- **Turn compression off for a streamed response.** Buffering to compress defeats streaming, which is the Server-Sent Events problem from Booklet 7
