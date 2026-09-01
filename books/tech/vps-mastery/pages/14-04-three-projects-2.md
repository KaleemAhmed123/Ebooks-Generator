### Every project attaches to them as external

```yaml
networks:
  edge:
    name: app_edge
    external: true
  data:
    name: app_data
    external: true
```

- `external: true` means "this already exists, do not create or delete it". Without it, `docker compose down` on one project removes a network the others are using

### Why the data layer must be separate

- Restarting Postgres during a deploy is a real outage, and it is not one blue-green can hide
- Keeping it out of the deploy path means the riskiest container is touched only when deliberately upgraded
