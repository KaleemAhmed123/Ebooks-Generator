## Connection draining

- When you deploy new code, you have to shut down the old instances. If you simply kill the Node.js process, any user currently in the middle of an HTTP request will receive a hard connection reset
- You must perform a Graceful Shutdown.
- When an instance is told to shut down (via a SIGTERM signal), it must do two things:
  1. Tell the load balancer to stop sending *new* requests to it
  2. Wait for all *existing* in-flight requests to finish, and only then exit

````typescript
// In Node.js, server.close() stops accepting new connections
// but keeps existing connections open until they finish
process.on('SIGTERM', () => {
  console.log("Shutting down gracefully...");
  
  server.close(() => {
    console.log("All in-flight requests finished. Exiting.");
    process.exit(0);
  });
});
````

### The failure

- The failure is the load balancer being unaware of the shutdown. If the Node process stops accepting new connections, but the load balancer still thinks the instance is healthy, the balancer will send new requests to it, which will instantly fail
- You must configure the load balancer with Connection Draining (also called Deregistration Delay). When you tell the balancer to remove an instance, it stops sending new traffic to it, but waits (e.g., 60 seconds) before officially severing the connection, giving the instance time to finish its in-flight work
