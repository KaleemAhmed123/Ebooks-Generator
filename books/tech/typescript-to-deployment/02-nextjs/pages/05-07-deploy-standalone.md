## Self-hosting with Docker

- Vercel is one deploy target. It is not the only one
- For a container, tell Next.js to trace exactly the files it needs

```ts
// next.config.ts
const nextConfig = { output: "standalone" }
export default nextConfig
```

- The build writes `.next/standalone`, a folder with a `server.js` and only the `node_modules` actually reached
- Copying the whole `node_modules` instead produces an image several times larger

```dockerfile
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

- Two stages, so build tools never reach the final image
- `server.js` is Next's own server. You are not running `next start` here
- `.next/static` and `public` are copied separately because tracing does not include them
