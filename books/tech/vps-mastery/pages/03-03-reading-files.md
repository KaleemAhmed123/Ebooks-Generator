## Reading files and following logs

```bash
cat docker-compose.yml          # whole file to the screen
less /var/log/nginx/access.log  # scrollable. q to quit, / to search
head -20 .env                   # first 20 lines
tail -50 build.log              # last 50 lines
tail -f build.log               # last lines, then follow as it grows
```

- `less` is the right tool for anything longer than a screen. Arrow keys scroll, `/pattern` searches, `G` jumps to the end
- `cat` on a 2 GB log file will lock the terminal. `tail` or `less` instead

### Searching inside files

```bash
grep -n "ECONNREFUSED" build.log          # with line numbers
grep -ri "database_url" /srv/app          # recursive, case-insensitive
grep -c "Failed password" /var/log/auth.log   # count only
grep -A5 -B5 "panic" app.log              # 5 lines either side
```

### Combining them

```bash
tail -f app.log | grep -i error
docker logs api 2>&1 | grep -c "500"
journalctl -u nginx --since "10 min ago" | less
```

- `2>&1` sends error output into normal output so the pipe carries both. Docker writes some log lines to error output, so this is needed more often than expected
