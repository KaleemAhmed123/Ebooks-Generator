### The timeout is the second half of the problem

- The default `proxy_read_timeout` is 60 seconds. An idle socket is closed after a minute, and the client reconnects in a loop
- Either raise the timeout as above, or send a heartbeat from the application more often than 60 seconds. Doing both is normal

### Confirming it works

```bash
curl -i -N -H "Connection: Upgrade" -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: dGVzdA==" \
  https://example.com/socket.io/
# HTTP/1.1 101 Switching Protocols
```

- `101` is success. `200` or `400` means the upgrade was swallowed
