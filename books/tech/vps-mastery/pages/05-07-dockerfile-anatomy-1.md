## Anatomy of a Dockerfile

- A Dockerfile is an ordered list of instructions. Each one produces a layer

```dockerfile
FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "dist/main.js"]
```

| Instruction | Does |
|---|---|
| `FROM` | The base image every later layer sits on |
| `WORKDIR` | Sets the directory for later instructions. Creates it if missing |
| `COPY` | Copies from the build context into the image |
| `RUN` | Executes a command at **build** time, and keeps the result |
| `ENV` | Sets an environment variable at **run** time |
| `EXPOSE` | Documentation only. Publishes nothing |
| `CMD` | The command run when a container starts |
