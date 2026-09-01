## Why HTTPS is not optional

- Plain HTTP is readable and modifiable by every network the traffic crosses. That includes the coffee shop wifi and the ISP

### What breaks without it

| Feature | Requires a secure context |
|---|---|
| Camera and microphone | Yes |
| Geolocation | Yes |
| Service workers, offline support | Yes |
| Clipboard write | Yes |
| Web push notifications | Yes |
| `Secure` cookies | Yes |
| HTTP/2 and HTTP/3 | In practice, yes |

- A **secure context** is a page loaded over HTTPS, or over `localhost` for development. The API is not merely discouraged elsewhere. It is absent, and the call throws

### The rest of it

- Browsers mark plain HTTP as "Not secure" in the address bar
- Search ranking treats HTTPS as a signal
- Any login form over HTTP sends the password in readable text

### Certificates are free and automatic

- Let's Encrypt issues them at no cost, and the renewal runs unattended. There has been no reason to serve plain HTTP since 2016
