### JSON logs

```bash
jq -r 'select(.level=="error") | .msg' app.log | sort | uniq -c | sort -rn
jq -r '[.time, .requestId, .msg] | @tsv' app.log | tail -20
jq -s 'map(.durationMs) | add/length' app.log      # average duration
```

### Editing in place

```bash
sed -i 's/old/new/g' config.yml
sed -i.bak 's/old/new/g' config.yml    # keep config.yml.bak
sed -n '100,120p' huge.log             # just those lines
```

- **`sort | uniq -c | sort -rn` is the single most useful pipeline on a server.** It turns any log into a frequency table
