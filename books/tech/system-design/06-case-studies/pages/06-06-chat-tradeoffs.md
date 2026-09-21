## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| a channel with 100 000 readers scrolling history | Discord put a data service in front of the store that coalesces identical in-flight requests: 1 000 clients asking for the same page cost one query, and requests are routed by a consistent hash of the channel id so the same service instance sees them all (Module 4, page 4) |
| end-to-end encryption and server-side search | they exclude each other. If the server holds only ciphertext, search runs on the device over its local copy; if the product needs server search, the server can read messages and the design says so |
| offline for a week | the store is the queue: on reconnect the client sends its last seen id per conversation and reads "after X" (page 3). No per-device outbox to keep in step, and history and catch-up are one code path |
| a photo in a message | never through the socket: upload to blob storage with a presigned URL (Module 9), send the URL as the message body. The socket carries text-sized frames only |
| editing and deleting | an edit is a new row that references the original, and the client shows the latest; a delete is a tombstone row of the same shape. `UPDATE` in place on a wide-column store is a write that hides the old value behind markers the read path must skip |
| gateway deploys | a gateway restart drops 100 000 sockets at once and they all reconnect within seconds: reconnect with jitter on the client, and a registry write on every connect, so the herd is spread and never mis-routed |
| multiple devices | the registry maps user → set of (device, gateway); delivery goes to every entry, and "read" is per user, so reading on the phone clears the badge on the laptop |

- The three numbers to hold in the head: 10 M sockets over about 100 gateways, 200 000 deliveries a second, 15 ms p99 for a history page on Discord's store. Every probe above is an argument about one of them

### The failure

- Building for the message rate. The design sizes the store and the service for 20 000 writes a second and passes; then it meets 10 M open connections and 600 000 pushes a second at peak, which were the numbers on page 1 that the design was for
