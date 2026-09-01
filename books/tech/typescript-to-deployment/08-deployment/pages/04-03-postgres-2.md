### The settings that matter, on a 8 GB box

| Setting | Value | Why |
|---|---|---|
| `shared_buffers` | **25% of RAM** | Postgres's own cache |
| `effective_cache_size` | **50 to 75% of RAM** | a hint, not an allocation. It shapes the planner |
| `work_mem` | 8 to 32 MB | **per sort, per connection.** 100 connections doing 3 sorts each at 64 MB is 19 GB |
| `maintenance_work_mem` | 256 MB to 1 GB | index builds and vacuum |
| `random_page_cost` | **1.1 on SSD** | the default 4.0 assumes a spinning disk and avoids indexes |
| `log_min_duration_statement` | 1000 | logs every query over a second |
| `--data-checksums` | on | detects silent corruption. **Cannot be enabled later** |

- **`work_mem` is the one that causes surprise out-of-memory kills.** It is per operation, not per server
- **`random_page_cost` is the single highest-value change on an SSD**, and almost nobody sets it

### Finding slow queries

```sql
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

SELECT calls, round(mean_exec_time::numeric,1) AS ms, round(total_exec_time::numeric) AS total, query
FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;
```
