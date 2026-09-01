### The job

```yaml
deploy:
  needs: test
  runs-on: ubuntu-latest
  environment: production
  steps:
    - name: Add the server to known_hosts
      run: |
        mkdir -p ~/.ssh
        ssh-keyscan -H ${{ secrets.DEPLOY_HOST }} >> ~/.ssh/known_hosts

    - name: Load the key
      run: |
        echo "${{ secrets.DEPLOY_SSH_KEY }}" > ~/.ssh/id_ed25519
        chmod 600 ~/.ssh/id_ed25519

    - name: Deploy
      run: ssh ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }} true
```

- The `true` is ignored. The forced command runs regardless, which is the point

### What it fixes and what it does not

- Fixes: tests gate the deploy, the commit is known, nobody deploys from a laptop
- Does not fix: **the build still happens on the production box**, taking memory from the running site
