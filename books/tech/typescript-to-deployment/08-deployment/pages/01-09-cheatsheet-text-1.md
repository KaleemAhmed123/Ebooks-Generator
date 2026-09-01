## Cheatsheet: reading logs and text

### The four that do most of the work

```bash
tail -f app.log                        # follow
tail -n 200 app.log                    # last 200 lines
head -c 2000 dump.json                 # first 2000 bytes
less +F app.log                        # follow, and Ctrl-C to scroll back
```

### Filtering a log

```bash
grep -i error app.log | tail -50
grep -v health app.log                     # exclude the noise
grep -A3 -B3 'ECONNREFUSED' app.log        # context around the match
grep -E '5[0-9]{2}' access.log             # 5xx
zgrep ERROR app.log.2.gz                   # inside a rotated log
```

### Counting and grouping, which is where the answer usually is

```bash
awk '{print $9}' access.log | sort | uniq -c | sort -rn     # status codes
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head   # top clients
awk '$9 >= 500' access.log | wc -l                          # how many 5xx
cut -d' ' -f7 access.log | sort | uniq -c | sort -rn | head  # busiest paths
```
