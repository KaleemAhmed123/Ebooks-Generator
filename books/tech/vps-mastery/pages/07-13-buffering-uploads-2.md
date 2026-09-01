### Response buffering

```nginx
proxy_buffering on;              # default
proxy_buffers 8 16k;
proxy_busy_buffers_size 32k;
```

- **Turn it off for streamed responses.** Server-sent events and streamed AI output arrive at the client in one lump at the end with buffering on

```nginx
location /api/chat/stream {
    proxy_pass http://api_gateway;
    proxy_buffering off;
    proxy_cache off;
    add_header X-Accel-Buffering no;
}
```

### Temporary files

```nginx
client_body_temp_path /var/cache/nginx/client_temp;
```

- Large uploads land here first. On a small disk this is a real consumer, and it is invisible until the disk fills
