## The full workflow - continued - continued

```yaml
deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: production, url: 'https://example.com' }
    steps:
      - run: |
          mkdir -p ~/.ssh
          ssh-keyscan -H ${{ secrets.DEPLOY_HOST }} >> ~/.ssh/known_hosts
          echo "${{ secrets.DEPLOY_SSH_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
      - run: |
          ssh ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} \
            "IMAGE_TAG=${{ github.sha }} /srv/app/scripts/deploy.sh"
```
