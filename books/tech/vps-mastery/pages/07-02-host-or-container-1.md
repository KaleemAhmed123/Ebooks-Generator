## Nginx on the host, or in a container

| | On the host | In a container |
|---|---|---|
| Install | `apt install nginx` | An image in the Compose file |
| Reaches containers by | `127.0.0.1:<published port>` | Service name |
| TLS certificates | Certbot writes and renews in place | Mounted in, renewal needs coordination |
| Config changes | Edit and reload. No downtime | Rebuild or restart the container |
| Survives `docker compose down` | Yes. Serves an error page | No. Connection refused |
| Version | Whatever Ubuntu ships | Whatever you pin |

### Host Nginx

- **Simplest for a single project.** Certbot's `--nginx` plugin edits the config and reloads by itself, and renewal needs no thought
- Every container must publish a port to `127.0.0.1` for Nginx to reach it

### Container Nginx

- **Better for multi-service stacks.** It joins the Docker network and reaches services by name, so no container publishes anything
- TLS is the complication. Certificates must be bind-mounted in, and a renewal on the host has to signal the container to reload
