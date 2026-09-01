### The default server catches everything else

- Any hostname pointing at this IP that matches nothing lands here. Left undefined, it lands on the first site by accident

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    return 444;
}
```

- `444` closes the connection with no response. It is Nginx-specific and the cheapest possible reply to a scanner
