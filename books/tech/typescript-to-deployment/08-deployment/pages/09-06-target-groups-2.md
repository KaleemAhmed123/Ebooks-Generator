### The two settings people miss

```bash
--attributes Key=idle_timeout.timeout_seconds,Value=120
```

- **The ALB idle timeout defaults to 60 seconds**, which silently kills Server-Sent Events and long polling. It counts time between bytes
- **Cross-zone load balancing is on by default for an ALB** and off for a Network Load Balancer, which surprises people migrating between them

### Reading a failure

- `Target.FailedHealthChecks` with a `504` from the ALB means the target is up and slow
- A `502` means the target closed the connection, usually a crash or a keep-alive mismatch
- **Set the Node server's `keepAliveTimeout` above the ALB idle timeout**, or Node closes a connection the ALB is about to reuse, which shows as random 502s
