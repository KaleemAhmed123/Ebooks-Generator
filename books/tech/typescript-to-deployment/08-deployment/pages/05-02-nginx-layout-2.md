### The global settings worth changing

```nginx
worker_processes auto;                # one per CPU core
worker_rlimit_nofile 65535;

events { worker_connections 4096; }

http {
  server_tokens off;                  # stop advertising the version
  client_max_body_size 20m;           # default is 1m, which breaks uploads
  keepalive_timeout 65;
}
```

- **`client_max_body_size` is the cause of most unexplained `413` errors** on a file upload
