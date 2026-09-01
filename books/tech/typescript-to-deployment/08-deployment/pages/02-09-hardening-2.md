### The three that are not optional

- **Never mount the Docker socket** into a container. `-v /var/run/docker.sock:/var/run/docker.sock` grants root on the host, plainly and completely
- **Never run `--privileged`** unless you are building container tooling and know exactly why
- **No secrets in the image or in `ENV`.** They appear in `docker inspect`, in the image layers, and in any registry that holds it

### Checking

```bash
docker run --rm myapp:1.4.2 id           # should not be uid=0
docker inspect myapp:1.4.2 --format '{{.Config.User}}'
```
