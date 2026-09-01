### HTTP/2

```nginx
listen 443 ssl;
listen [::]:443 ssl;
http2 on;
```

- Since Nginx 1.25 this is a separate directive. The old `listen 443 ssl http2;` form is deprecated

### Verifying the result

```bash
openssl s_client -connect example.com:443 -servername example.com -tls1_3 </dev/null
nmap --script ssl-enum-ciphers -p 443 example.com
```

- Then run it through an external scanner. A configuration that looks correct locally can still be missing an intermediate certificate
