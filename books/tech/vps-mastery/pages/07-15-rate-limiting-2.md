### Behind a CDN, the address is wrong

- Every request then carries the CDN's address and one client exhausts the limit for everyone

```nginx
set_real_ip_from 173.245.48.0/20;     # the CDN ranges
real_ip_header X-Forwarded-For;
real_ip_recursive on;
```

- Rate limiting is a blunt instrument. It stops scrapers and credential stuffing. It does not stop a distributed attack, which needs help upstream of the box
