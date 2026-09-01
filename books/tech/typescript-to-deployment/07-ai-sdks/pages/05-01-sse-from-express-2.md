## Pushing a stream out of Express - continued

### The four headers, and why each one is there

- **`text/event-stream`** is what makes the browser treat it as a stream rather than a download
- **`no-transform`** stops a CDN rewriting the body, which corrupts the framing
- **`X-Accel-Buffering: no`** disables Nginx buffering. Without it Nginx holds the whole response and streaming silently stops working in production only
- Two newlines end an event. One newline and the browser waits forever
