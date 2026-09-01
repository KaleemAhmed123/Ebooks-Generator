## Preview environments

- One staging environment is a queue. Two people with two branches cannot both use it, and the second one waits
- **A preview environment is a complete stack per pull request**, created on open and destroyed on merge. It removes the queue entirely

```yaml
  preview:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - run: |
          ssh deploy@staging-box "
            cd /srv/previews &&
            TAG=${{ github.sha }} PR=${{ github.event.number }} \
            docker compose -p pr-${{ github.event.number }} up -d --wait"
      - uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner, repo: context.repo.repo,
              body: 'Preview: https://pr-${{ github.event.number }}.preview.example.com'
            })
```

```yaml
  teardown:
    if: github.event.action == 'closed'
    steps:
      - run: ssh deploy@staging-box "docker compose -p pr-${{ github.event.number }} down -v"
```
