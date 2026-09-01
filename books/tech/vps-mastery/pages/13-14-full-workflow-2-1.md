## The full workflow - continued

```yaml
build:
    needs: test
    runs-on: ubuntu-latest
    permissions: { contents: read, packages: write }
    strategy:
      fail-fast: false
      max-parallel: 6
      matrix:
        service: [api-gateway, auth, catalog, orders, payments,
                  shipping, sellers, payouts, notifications,
                  admin, logger, chat]
    steps:
      - uses: actions/checkout@v5
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          context: .
          file: docker/Dockerfile.service
          build-args: SERVICE=${{ matrix.service }}
          platforms: linux/amd64
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.OWNER }}/${{ matrix.service }}:${{ github.sha }}
          cache-from: type=gha,scope=${{ matrix.service }}
          cache-to: type=gha,mode=max,scope=${{ matrix.service }}
```
