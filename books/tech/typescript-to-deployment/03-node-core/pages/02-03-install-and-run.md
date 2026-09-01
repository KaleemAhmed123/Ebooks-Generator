## Install and run

- Install the **LTS** release for anything going to production
- Node 24 is the active LTS. Node 26 became Current in May 2026 and enters LTS in October
- Use `nvm` or `fnm` so each project can pin its own version

```bash
node --version      # v24.11.0
node app.js         # run a file
node                # REPL, ctrl-d to leave
```

### Flags worth knowing on day one

```bash
node --watch app.js            # restart on file change, no nodemon needed
node --env-file=.env app.js    # load a .env, no dotenv needed
node --run dev                 # run a package.json script, faster than npm run
node --check app.js            # parse only, do not execute
```

- `--watch` landed in Node 18 and is stable. It replaces `nodemon` for most projects
- `--env-file` replaces `dotenv` for simple cases
- `--run` skips npm's process spawn, which is noticeably faster

### Pinning the version for a team

```json
{ "engines": { "node": ">=24" } }
```

- Add a `.nvmrc` with `24` so `nvm use` picks it up automatically
