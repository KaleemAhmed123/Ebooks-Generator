## The deploy job

```yaml
deploy:
  needs: build
  runs-on: ubuntu-latest
  environment: production
  steps:
    - name: known_hosts
      run: |
        mkdir -p ~/.ssh
        ssh-keyscan -H ${{ secrets.DEPLOY_HOST }} >> ~/.ssh/known_hosts

    - name: key
      run: |
        echo "${{ secrets.DEPLOY_SSH_KEY }}" > ~/.ssh/id_ed25519
        chmod 600 ~/.ssh/id_ed25519

    - name: deploy
      env:
        HOST: ${{ secrets.DEPLOY_HOST }}
        USER: ${{ secrets.DEPLOY_USER }}
      run: |
        ssh "$USER@$HOST" "IMAGE_TAG=${{ github.sha }} /srv/app/scripts/deploy.sh"
```
