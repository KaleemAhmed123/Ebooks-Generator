## The port map, written down

- With fifteen services, port assignments must be recorded somewhere other than memory. Keep this table in the repository

| Service | Container port | Published |
|---|---|---|
| nginx | 80, 443 | **`0.0.0.0` - the only public ports** |
| shop-ui | 3000 | no |
| seller-ui | 3001 | no |
| admin-ui | 3002 | no |
| api-gateway | 8080 | no |
| auth | 8081 | no |
| catalog | 8082 | no |
| orders | 8083 | no |
| payments | 8084 | no |
| shipping | 8085 | no |
| sellers | 8086 | no |
| payouts | 8087 | no |
| notifications | 8088 | no |
| admin | 8089 | no |
| logger | 8090 | no |
| chat | 6010 | no |
| postgres | 5432 | no |
| redis | 6379 | no |
| rabbitmq | 5672, 15672 | no |
| minio | 9000, 9001 | no |
