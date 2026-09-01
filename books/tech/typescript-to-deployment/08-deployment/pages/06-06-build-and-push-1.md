## Building and pushing the image

```yaml
  build:
    needs: check
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions: { id-token: write, contents: read }
    outputs:
      image: ${{ steps.meta.outputs.image }}

    steps:
      - uses: actions/checkout@v7

      - uses: aws-actions/configure-aws-credentials@v6
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-deploy
          aws-region: ap-south-1

      - id: ecr
        uses: aws-actions/amazon-ecr-login@v2

      - uses: docker/setup-buildx-action@v4

      - id: meta
        run: |
          IMAGE=${{ steps.ecr.outputs.registry }}/orders-api:${{ github.sha }}
          echo "image=$IMAGE" >> "$GITHUB_OUTPUT"

      - uses: docker/build-push-action@v7
        with:
          context: .
          push: true
          provenance: true
          tags: |
            ${{ steps.meta.outputs.image }}
            ${{ steps.ecr.outputs.registry }}/orders-api:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```
