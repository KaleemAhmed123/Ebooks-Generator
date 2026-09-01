### Promote the digest, not the tag

```bash
DIGEST=$(docker buildx imagetools inspect ghcr.io/acme/orders-api:abc123 \
  --format '{{json .Manifest.Digest}}' | tr -d '"')
ssh deploy@prod "IMAGE=ghcr.io/acme/orders-api@$DIGEST /srv/app/deploy.sh"
```

- **A tag can be overwritten. A digest cannot.** Promoting the digest is the only way to be certain production runs what staging ran
- ECR's `IMMUTABLE` setting from Module 9 achieves the same thing by making tags unchangeable

### What cannot be promoted

- **The database migration.** It runs in each environment separately, against different data
- That is why migrations must be **backward compatible**, as Module 10 requires. Staging proves the migration applies; it does not prove it applies to production's data volume
- **Run the migration against a restored production copy before promoting anything schema-shaped.** It is the only way to find the `ALTER TABLE` that locks for six minutes
