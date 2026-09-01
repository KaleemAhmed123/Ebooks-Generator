## Promoting a build

- **Build once. Deploy that exact artifact to staging, then to production.** Rebuilding for production means production runs bytes nobody tested

```text
  commit abc123
      |
      v
  build  ->  ghcr.io/acme/orders-api:abc123        one image, one digest
      |
      +--> staging   (automatic, on merge)
      |
      +--> production (manual approval, same digest)
```

```yaml
  promote:
    needs: [build, deploy-staging]
    environment:
      name: production
      url: https://api.example.com
    steps:
      - run: ssh deploy@prod "/srv/app/deploy.sh ${{ github.sha }}"
```

- **`environment: production` attaches the approval rule**, so a person clicks before it goes out
