### Server-Sent Events

```nginx
location /api/v1/stream {
  proxy_pass http://app;
  proxy_http_version 1.1;
  proxy_set_header Connection "";
  proxy_buffering off;
  gzip off;
  chunked_transfer_encoding on;
  proxy_read_timeout 3600s;
}
```

- **`proxy_buffering off` is the whole answer.** With buffering on, Nginx collects the entire response before sending any of it, so streaming works locally and not in production
- The application can set `X-Accel-Buffering: no` per response instead, which is better when only some endpoints stream
- **`gzip off` too.** The compressor buffers, which reintroduces the same problem
