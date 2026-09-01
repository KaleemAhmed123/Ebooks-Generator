## TLS in five lines

- Nginx with certbot works and is covered in Module 5. **Caddy obtains and renews certificates by itself**, with no cron job and no plugin
- On a single box this removes an entire category of maintenance

```text
# /srv/app/caddy/Caddyfile
api.example.com {
	reverse_proxy api:3000
	encode zstd gzip
	header {
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		X-Content-Type-Options nosniff
		X-Frame-Options DENY
	}
	log {
		output file /var/log/caddy/access.log
		format json
	}
}
```

```yaml
  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports: ["80:80", "443:443", "443:443/udp"]
    volumes:
      - ./caddy/Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy-data:/data          # the certificates. Losing this re-issues them
      - caddy-config:/config
```

- **That is the whole TLS setup.** Point the DNS record at the box, start it, and the certificate is issued within seconds
- **The `443/udp` line enables HTTP/3.** Leave it in
- **`caddy-data` must persist.** Deleting it re-requests certificates, and Let's Encrypt rate limits repeated requests for the same name
