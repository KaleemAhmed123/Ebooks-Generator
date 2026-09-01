## Deploying to EC2

- The obvious approach is SSH from the runner. That needs a private key in repository secrets and port 22 open to GitHub's address ranges
- **Systems Manager does the same job with no key and no open port.** The instance polls SSM; nothing connects inward

```yaml
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    permissions: { id-token: write, contents: read }

    steps:
      - uses: aws-actions/configure-aws-credentials@v6
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-deploy
          aws-region: ap-south-1

      - name: Roll the instances
        run: |
          aws ssm send-command \
            --document-name AWS-RunShellScript \
            --targets Key=tag:Role,Values=orders-api \
            --max-concurrency 1 --max-errors 0 \
            --comment "deploy ${{ github.sha }}" \
            --parameters commands=[\
              "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin ${{ needs.build.outputs.image }}",\
              "docker pull ${{ needs.build.outputs.image }}",\
              "docker stop -t 30 api || true",\
              "docker rm api || true",\
              "docker run -d --name api --restart unless-stopped -p 127.0.0.1:3000:3000 --env-file /etc/app.env ${{ needs.build.outputs.image }}",\
              "sleep 5 && curl -fsS localhost:3000/health"\
            ] \
            --query 'Command.CommandId' --output text
```
