## TLS settings worth setting

- Certbot writes a reasonable default into `/etc/letsencrypt/options-ssl-nginx.conf`. These are the ones worth reviewing

```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 1d;
ssl_session_tickets off;

ssl_stapling on;
ssl_stapling_verify on;
resolver 1.1.1.1 8.8.8.8 valid=300s;
```

| Directive | Why |
|---|---|
| `ssl_protocols` | TLS 1.0 and 1.1 are removed. 1.3 is faster and simpler |
| `ssl_prefer_server_ciphers off` | With 1.3, the client's order is the better one |
| `ssl_session_cache` | Resumption avoids a full handshake on every connection |
| `ssl_session_tickets off` | Tickets weaken forward secrecy unless keys are rotated |
| `ssl_stapling` | The server fetches the revocation response, saving the client a lookup |

- `ssl_stapling` needs a `resolver`, or it silently does nothing
