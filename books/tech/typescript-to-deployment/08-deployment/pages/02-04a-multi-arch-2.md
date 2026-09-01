### Bake, for more than one image

```hcl
// docker-bake.hcl
group "default" { targets = ["api", "worker"] }

target "api" {
  context    = "."
  dockerfile = "apps/api/Dockerfile"
  platforms  = ["linux/amd64", "linux/arm64"]
  tags       = ["myrepo/orders-api:${TAG}"]
  cache-from = ["type=gha"]
  cache-to   = ["type=gha,mode=max"]
}
```

```bash
TAG=$SHA docker buildx bake --push
```

- **Bake builds every image in a monorepo in parallel, from one file.** It replaces a shell script looping over `docker build`
