### Cache headers for static assets

```nginx
location ^~ /_next/static/ {
    proxy_pass http://shop_ui;
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(jpg|jpeg|png|webp|svg|woff2)$ {
    proxy_pass http://shop_ui;
    expires 30d;
    add_header Cache-Control "public";
}
```

- `immutable` is safe only for content-hashed filenames. Next.js and Vite both produce them
- **Never cache HTML this way.** A one-year cache on a page is unrecoverable without changing the URL

### add_header replaces, it does not append

- Any `add_header` in a location block discards every `add_header` inherited from the server block. Repeat the ones still needed, or use `always` and keep them together
