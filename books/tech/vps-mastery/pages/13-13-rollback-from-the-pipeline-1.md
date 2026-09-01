## Rollback from the pipeline

- With images in a registry, a rollback is a deploy of an older tag. Nothing is rebuilt

```yaml
name: Rollback

on:
  workflow_dispatch:
    inputs:
      tag:
        description: "Image tag to roll back to"
        required: true

jobs:
  rollback:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: key and known_hosts
        run: |
          mkdir -p ~/.ssh
          ssh-keyscan -H ${{ secrets.DEPLOY_HOST }} >> ~/.ssh/known_hosts
          echo "${{ secrets.DEPLOY_SSH_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519

      - name: roll back
        run: |
          ssh ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} \
            "ROLLBACK=1 IMAGE_TAG=${{ inputs.tag }} /srv/app/scripts/deploy.sh"
```

- `workflow_dispatch` puts a **Run workflow** button in the Actions tab with a field for the tag. That is the interface someone needs at 3am

### Finding the tag to go back to

```bash
ssh prod "cat /srv/app/.env.tag.prev"
# IMAGE_TAG=6b2d40e
```

- The deploy script writes the previous tag before switching. That file is the rollback target
