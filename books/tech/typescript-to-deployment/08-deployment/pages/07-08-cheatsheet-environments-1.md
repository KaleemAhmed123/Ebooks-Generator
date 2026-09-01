## Cheatsheet: environments

### Local

```bash
cp .env.example .env
docker compose up -d --wait db redis
npx prisma migrate deploy && npm run seed
npm run dev

docker compose down -v && make dev            # full reset
docker compose exec db psql -U app
docker compose logs -f --tail 100
```

### Checking what an environment is actually running

```bash
curl -s https://api.example.com/health | jq .version
ssh prod 'cd /srv/app && grep ^TAG= .env'
aws ecs describe-services --cluster production --services orders-api \
  --query 'services[0].taskDefinition'
docker compose images                          # what is running here, by digest
gh run list --workflow deploy.yml --limit 5
```

### Comparing two environments

```bash
# same image?
for h in staging.example.com api.example.com; do
  printf '%-24s ' "$h"; curl -s "https://$h/health" | jq -r .version
done

# same migrations applied?
npx prisma migrate status

# same config keys?
diff <(ssh staging 'cut -d= -f1 /srv/app/.env' | sort) \
     <(ssh prod    'cut -d= -f1 /srv/app/.env' | sort)
```

- **The last one finds the variable that exists in production and not in staging**, which is the usual cause of "it worked in staging"
