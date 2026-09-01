## The build and push job

```yaml
build:
  needs: test
  runs-on: ubuntu-latest
  permissions:
    contents: read
    packages: write
  steps:
    - uses: actions/checkout@v5

    - uses: docker/setup-buildx-action@v3

    - uses: docker/login-action@v3
      with:
        registry: ghcr.io
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}

    - uses: docker/metadata-action@v5
      id: meta
      with:
        images: ghcr.io/${{ github.repository_owner }}/orders
        tags: |
          type=sha,format=long
          type=raw,value=latest,enable={{is_default_branch}}

    - uses: docker/build-push-action@v6
      with:
        context: .
        file: docker/Dockerfile.service
        build-args: SERVICE=orders
        platforms: linux/amd64
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
        provenance: false
```
