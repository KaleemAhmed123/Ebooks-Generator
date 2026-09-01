## Before the deploy

- Five minutes of checking replaces most rollbacks. **Every item is a command, not a judgement**

### The checks

```bash
# 1. is the pipeline green on this commit
gh run list --branch main --limit 3

# 2. what is actually going out
git log --oneline $(ssh prod 'grep ^TAG= /srv/app/.env | cut -d= -f2')..HEAD
git diff --stat <deployed-sha>..HEAD

# 3. does it contain a migration
git diff --name-only <deployed-sha>..HEAD -- '*/migrations/*' 'prisma/migrations/*'

# 4. does it contain a dependency change
git diff <deployed-sha>..HEAD -- package.json package-lock.json

# 5. is the system currently healthy
curl -sS -o /dev/null -w '%{http_code} %{time_total}s\n' https://api.example.com/ready

# 6. is there capacity headroom
ssh prod 'df -h / && free -h && docker stats --no-stream'
```

### The decision points

| If | Then |
|---|---|
| the pipeline is red | **stop.** Do not deploy past a failing test |
| it contains a migration | read it. Is it expand-only, as Module 10 requires |
| the migration touches a large table | check for `CONCURRENTLY` and a `lock_timeout` |
| a new dependency appeared | someone approved it, per Booklet 9 |
| the system is already degraded | **fix that first.** Deploying into an incident confuses both |
| disk is above 85 percent | clear it first. A deploy pulls an image |
