## Registries, tags and digests

- A **registry** stores images. Docker Hub is the default, ECR is covered in Part Four, and a self-hosted one is covered in Module 4

```bash
docker login registry.example.com
docker tag orders-api:1.4.2 registry.example.com/team/orders-api:1.4.2
docker push registry.example.com/team/orders-api:1.4.2
docker pull registry.example.com/team/orders-api:1.4.2
```

### Tags are mutable, digests are not

```bash
docker inspect --format '{{ index .RepoDigests 0 }}' orders-api:1.4.2
# registry.example.com/team/orders-api@sha256:9f2b1c...
```

| Reference | Means |
|---|---|
| `:latest` | whatever was pushed last. **Never deploy this** |
| `:1.4.2` | a version, and it can be overwritten |
| `:$GIT_SHA` | **the tag to deploy.** Traceable to a commit |
| `@sha256:...` | exact content. Cannot change |

- **Pin base images by digest in production Dockerfiles**, and rebuild on a schedule so security fixes still arrive

### Rate limits, which cause surprising CI failures

- Docker Hub limits anonymous pulls per address. **A CI runner shared with other projects hits it**, and the error looks like a network problem
- Authenticate in CI, or mirror the images you depend on into your own registry
