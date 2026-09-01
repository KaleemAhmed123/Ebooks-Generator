### The keep-alive detail behind random 502s

- An ALB holds connections open for 60 seconds
- Node's default `keepAliveTimeout` is 5 seconds, so Node closes a connection the balancer still believes in
- The next request on it fails with a 502 that appears in no application log
- Setting `keepAliveTimeout` above the balancer's idle timeout removes the whole class of error
