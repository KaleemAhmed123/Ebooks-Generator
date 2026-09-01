### Rotating a database password

1. Create a second user with the same permissions
2. Deploy with the new credentials
3. Confirm nothing is still connecting as the old user
4. Drop the old user

```sql
SELECT usename, count(*) FROM pg_stat_activity GROUP BY usename;
```

- Step 3 is the one that gets skipped, and the missed background worker fails at 3am
