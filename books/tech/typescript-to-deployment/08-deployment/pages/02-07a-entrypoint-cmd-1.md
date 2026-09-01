## `ENTRYPOINT` and `CMD`

- Two instructions that both say what runs. **`ENTRYPOINT` is the program; `CMD` is its default arguments**

```dockerfile
ENTRYPOINT ["node"]
CMD ["dist/index.js"]
```

```bash
docker run myapp                      # node dist/index.js
docker run myapp dist/worker.js       # node dist/worker.js
docker run --entrypoint sh myapp -c 'ls -la'
```

| Form | Runs as | Signals |
|---|---|---|
| `CMD ["node", "a.js"]` exec form | direct process, PID 1 | **received** |
| `CMD node a.js` shell form | `/bin/sh -c "node a.js"` | **swallowed by the shell** |

- **Always the exec form for the process that matters.** The shell form is why a container ignores `docker stop` and waits ten seconds for the kill
