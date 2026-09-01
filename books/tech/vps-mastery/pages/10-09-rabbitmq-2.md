### The management interface

- The image with `-management` exposes a web console on 15672. **Do not publish it.** Route it through Nginx behind authentication, or reach it over an SSH tunnel

```bash
ssh -L 15672:localhost:15672 kaleem@203.0.113.10
```

### Durability is not the default

- A queue and a message are both lost on restart unless declared durable and published persistent. A broker configured carelessly loses work silently, which is worse than not having one
