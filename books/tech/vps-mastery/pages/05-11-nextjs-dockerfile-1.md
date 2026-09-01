## A production Dockerfile for Next.js

- Next.js needs its own recipe because of two things: standalone output, and values baked in at build time

```dockerfile
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
```

### Standalone output

- In `next.config.js`, set `output: "standalone"`. Next.js then emits `server.js` with only the modules it actually needs
- Without it the final image carries the whole `node_modules` tree, which is several hundred megabytes of nothing
