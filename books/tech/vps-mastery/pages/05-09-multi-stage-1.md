## Multi-stage builds

- A build needs TypeScript, the full dependency tree, and a compiler. Running the result needs none of them
- A **multi-stage build** compiles in one stage and copies only the output into a clean final stage

```dockerfile
# ---- stage 1: build ----
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci                       # including devDependencies
COPY . .
RUN npm run build                # produces dist/

# ---- stage 2: run ----
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
CMD ["node", "dist/main.js"]
```

### What this removes from the shipped image

| Left behind in stage 1 | Size |
|---|---|
| TypeScript, ESLint, test runner, type packages | 300 MB to 600 MB |
| Source `.ts` files | Small, but should not ship |
| npm cache | 100 MB and up |

- A typical Node service drops from around 1.1 GB to around 180 MB
