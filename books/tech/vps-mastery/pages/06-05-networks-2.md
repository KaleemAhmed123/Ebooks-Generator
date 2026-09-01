### Inspecting

```bash
docker network ls
docker network inspect app_internal --format '{{range .Containers}}{{.Name}} {{end}}'
# app-orders-1 app-postgres-1 app-api-gateway-1
```

### Start simple

- One default network until there is a specific reason for a second. Part Four splits them once the stack has an edge and an interior worth separating
