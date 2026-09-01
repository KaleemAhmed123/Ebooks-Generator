## A Dockerfile for a Node service

```dockerfile
# syntax=docker/dockerfile:1
FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]
```

| Instruction | Does |
|---|---|
| `FROM` | the base image every later layer sits on |
| `WORKDIR` | sets the directory, and creates it |
| `COPY` | copies from the build context into the image |
| `RUN` | executes at **build** time, creating a layer |
| `CMD` | the default command at **run** time |
| `ENTRYPOINT` | the command that always runs, with `CMD` as its arguments |
| `EXPOSE` | documentation only. It publishes nothing |
| `USER` | which user the process runs as |
