## Memory, and how to read it

```bash
free -h
```

```text
               total   used   free   shared  buff/cache   available
Mem:           3.8Gi  2.1Gi  180Mi    12Mi       1.5Gi       1.4Gi
Swap:          2.0Gi  128Mi  1.9Gi
```

- **`free` is not the useful number.** Linux uses spare RAM as disk cache on purpose. Low `free` is healthy
- **`available` is the useful number.** It is what a new process could take, including cache the kernel would release
- `available` near zero means the next allocation fails or something gets killed

### Per-process

```bash
ps aux --sort=-%mem | head -6
top -o %MEM
```
