## Multi-stage builds

- Building TypeScript needs the compiler, the dev dependencies and the source. Running the output needs none of them
- A single-stage image ships all of it: a larger image, a longer pull, and a much wider attack surface
- **A multi-stage build compiles in one stage and copies only the result into a clean final stage**

```dockerfile
# syntax=docker/dockerfile:1
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

- **Only what `COPY --from` names reaches the final image.** The source, the compiler and the build cache are discarded
- Typical result on a Node service: 1.1 GB down to about 180 MB
