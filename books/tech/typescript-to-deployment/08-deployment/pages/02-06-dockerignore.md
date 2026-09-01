## The build context and `.dockerignore`

- `docker build .` sends the whole directory, the **build context**, to the daemon before anything runs
- With `node_modules` and `.git` present that is often hundreds of megabytes, uploaded on every single build
- **`.dockerignore` is the fix, and it is the most commonly missing file in a Node repository**

```text
node_modules
.git
.github
dist
coverage
*.log
.env
.env.*
Dockerfile*
docker-compose*.yml
**/*.test.ts
README.md
.vscode
```

### Why it matters beyond speed

- **`COPY . .` copies your `.env` into the image** if it is not ignored. Anyone who can pull the image has your production secrets
- Copying a host `node_modules` in overwrites the one installed for the container's platform, which breaks native modules in ways that make no sense
- **`.git` carries every secret ever committed and later removed**, and it is the most common accidental leak in a container image

### Checking what actually went in

```bash
docker build --progress=plain . 2>&1 | head -5   # the context size is printed
docker run --rm -it myapp:latest sh -c 'ls -la /app'
```

- **`.dockerignore` is not `.gitignore`.** They are separate files and the ignore rules are not shared
- A file that is committed and should not be in the image, such as a README or a test fixture, needs an entry here even though git tracks it
