# Module 6 - Shipping to Production

## Deploying at the Edge

- The traditional Node.js backend runs in one data centre (e.g., us-east-1). If your user is in Sydney, they pay a 250ms latency penalty on every round trip
- **Edge computing** moves the code to servers physically close to the user
- Vercel Edge Functions, Cloudflare Workers, and AWS Lambda@Edge run a constrained JavaScript runtime (usually V8 isolates)
- You cannot use native Node modules (`fs`, `crypto`) or write to disk

### Why it matters for frontend

- Next.js Middleware runs at the edge. It can rewrite requests, check authentication, and set cookies before the request even reaches your main server
- You can personalise a page based on the user's country header without waiting for a database trip
- AI streaming responses feel instantly responsive when the connection terminates at the edge rather than crossing an ocean first

```ts
// middleware.ts (Next.js)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
