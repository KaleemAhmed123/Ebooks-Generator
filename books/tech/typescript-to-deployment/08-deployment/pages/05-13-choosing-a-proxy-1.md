## Choosing the proxy

| | Nginx | Caddy | Traefik | HAProxy |
|---|---|---|---|---|
| TLS | certbot, a timer | **automatic** | automatic | manual |
| Config | one file, verbose | one file, compact | **container labels** | one file, verbose |
| New service | edit and reload | edit and reload | **nothing** |edit and reload |
| Raw throughput | **highest** | high | high | **highest** |
| Docs and recipes | **everywhere** | good | good | good |
| Memory | ~20 MB | ~40 MB | ~80 MB | ~20 MB |
| Best at | static files, caching, tuning | **small deployments** | **dynamic stacks** | TCP load balancing |

### The recommendation

- **One box, a handful of services: Caddy.** Automatic TLS and correct proxy headers remove the two things people most often get wrong
- **A dynamic stack with many services: Traefik.** The labels pay for themselves the third time a service is added
- **High traffic, static assets, or a team that already knows it: Nginx.** It is the most tunable and the most documented
- **On AWS, the ALB does this job**, and Nginx on the instance handles only what the ALB does not
