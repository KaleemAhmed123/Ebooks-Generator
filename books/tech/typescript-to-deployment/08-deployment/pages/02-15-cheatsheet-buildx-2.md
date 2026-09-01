### Inspecting what you built

```bash
docker images app --format '{{.Repository}}:{{.Tag}} {{.Size}}'
docker history --no-trunc app:1.4.2 | head -20
docker image inspect app:1.4.2 --format '{{.Config.User}} {{.Config.Cmd}}'
docker image inspect app:1.4.2 --format '{{index .RepoDigests 0}}'
docker scout cves app:1.4.2
docker scout recommendations app:1.4.2
trivy image --severity HIGH,CRITICAL app:1.4.2
dive app:1.4.2                                      # layer by layer, interactively
```

### Registry

```bash
docker login registry.example.com
docker tag app:1.4.2 registry.example.com/app:1.4.2
docker push registry.example.com/app:1.4.2
docker pull registry.example.com/app@sha256:9f2b...
docker manifest inspect repo/app:1.4.2
```
