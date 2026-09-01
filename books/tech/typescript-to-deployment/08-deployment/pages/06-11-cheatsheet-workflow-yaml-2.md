### Passing values around

```yaml
jobs:
  build:
    outputs: { image: ${{ steps.meta.outputs.image }} }
    steps:
      - id: meta
        run: echo "image=repo/app:${GITHUB_SHA}" >> "$GITHUB_OUTPUT"
  deploy:
    needs: build
    steps:
      - run: echo ${{ needs.build.outputs.image }}
```

### Job control

```yaml
concurrency: { group: deploy-${{ github.ref }}, cancel-in-progress: false }
timeout-minutes: 15
continue-on-error: true
strategy: { fail-fast: false, matrix: { node: [22, 24] } }
permissions: { contents: read, id-token: write, packages: write }
```

- **`cancel-in-progress: false` on a deploy job.** Cancelling a deploy halfway is worse than queuing it
