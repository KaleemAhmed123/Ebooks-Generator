### What does not change whichever you pick

- **The application binds to `127.0.0.1` and the proxy is the only public listener**
- **`X-Forwarded-For` and `X-Forwarded-Proto` must reach the application**, and `trust proxy` must be set to the right number of hops
- **Buffering must be off for streamed responses.** `proxy_buffering off`, `flush_interval -1`, or the Traefik equivalent
- **The idle timeout must exceed your longest response**, or WebSockets and SSE drop at sixty seconds

### The migration is smaller than it looks

- Every one of these is a container with a config file and ports 80 and 443. **Switching is one compose change and one config translation**
- Do it during a quiet hour, keep the old config, and watch the error rate
