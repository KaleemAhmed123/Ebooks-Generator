### Provenance and signing

```bash
docker buildx build --provenance=true --sbom=true -t myapp:1.4.2 --push .
cosign sign --key cosign.key myregistry/myapp:1.4.2
```

- An **SBOM** lists everything in the image, which is what makes "are we affected by this advisory" a query rather than an investigation
- **Never deploy the `latest` tag.** Tag with the commit SHA, so what is running is always traceable to a commit
