## HTTP/1.1, 2 and 3

- The semantics above are identical across all three. What changes is how bytes move

### HTTP/1.1

- One request at a time per connection. A slow response blocks everything behind it, which is **head-of-line blocking**
- Browsers worked around it by opening six connections per host, which is why asset domains used to be sharded
- Headers are plain text and repeated in full on every request

### HTTP/2

- Many requests **multiplexed** over one connection, so a slow response no longer blocks the others
- Headers are compressed, which matters when every request carries the same large auth token
- Still TCP underneath, so a lost packet stalls every stream on that connection

### HTTP/3

- Runs on QUIC over UDP instead of TCP, so a lost packet stalls only its own stream
- Connections survive a network change, which is why a phone moving from wifi to mobile data no longer drops the request

### What a backend engineer does about it

- Usually nothing in application code. The load balancer or CDN terminates the newer protocol and speaks HTTP/1.1 to your service
- Two things still matter: keep-alive timeouts must exceed the balancer's idle timeout, and domain sharding is now actively harmful because it defeats multiplexing
