## Vercel or self-hosted

| | Vercel | Self-hosted |
|---|---|---|
| Deploy | git push | your pipeline |
| Scaling | automatic | you size it |
| ISR and revalidation | works out of the box | needs shared storage across instances |
| Image optimization | included | runs on your CPU, or use a CDN |
| Streaming | supported | check your proxy buffers |
| Cost model | per invocation and bandwidth | per server, flat |
| Database connections | pooler required | one pool per container |

### What quietly breaks when you self-host

- **Revalidation across instances.** Two containers, each with its own cache. Invalidate on one and the other still serves stale. You need a shared cache handler
- **Nginx buffering.** Streaming looks broken until you turn `proxy_buffering off` on that location
- **Image optimization.** Now it is your CPU resizing every image on request

### How to choose

- Small team, standard app, no infrastructure appetite: Vercel
- Already running containers on EC2, want one deploy story, care about flat cost: self-host
