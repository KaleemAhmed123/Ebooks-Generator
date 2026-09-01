## Deploying at the Edge - continued

export function middleware(request: NextRequest) {
  // Runs in milliseconds, globally
  const country = request.geo?.country || 'US'
  
  if (country === 'IN') {
    return NextResponse.rewrite(new URL('/in', request.url))
  }
}
```

### The database problem

- Edge compute is fast, but if your database is still in `us-east-1`, your edge function has to cross the ocean anyway
- Connecting directly to Postgres from a V8 isolate usually fails because isolates cannot maintain persistent TCP connections
- The solution: Edge-compatible database drivers (Prisma Edge) or HTTP-based databases (PlanetScale, Supabase via REST)
