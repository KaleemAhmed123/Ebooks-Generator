## Install and run

- Node 20.9 or newer is required by Next.js 16
- TypeScript 5.1 or newer

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

- The app starts on port 3000
- `next dev` and `next build` both use **Turbopack** by default from version 16
  - the `--turbopack` flag is no longer needed
  - pass `--webpack` if you still need the old bundler

### The scripts you get

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

- `dev` runs a development server with hot reload
- `build` produces the production output
- `start` serves that output. It will not work until you have built
