### Finding things

```bash
find /srv -name '*.log' -mtime +7          # older than 7 days
find /srv -type f -size +100M              # large files
find . -name node_modules -prune -o -name '*.ts' -print
find /var/log -name '*.gz' -delete

grep -rn 'DATABASE_URL' /srv/app --include='*.ts'
grep -rl 'TODO' . | head                   # files only
grep -c ERROR app.log                      # count
rg 'timeout' -t ts                         # ripgrep, much faster
```

- **`find ... -delete` runs immediately.** Run it without `-delete` first, every time
