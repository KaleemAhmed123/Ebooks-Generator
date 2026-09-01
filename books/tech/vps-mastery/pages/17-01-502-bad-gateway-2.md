### The cause that is not obvious

- The application bound to `127.0.0.1` **inside** the container. It is then reachable only from within that container, and Nginx cannot connect

```ts
app.listen(8080, "0.0.0.0");    // correct in a container
app.listen(8080, "127.0.0.1");  // produces a permanent 502
```

- Confirm from inside:

```bash
docker compose exec orders sh -c "netstat -tlpn 2>/dev/null || ss -tlpn"
# 0.0.0.0:8080   correct
# 127.0.0.1:8080  this is the bug
```

### 504 is a different problem

- 502 means no usable answer. **504 means the backend was too slow.** Page 17-07
