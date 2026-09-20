## Pools multiply

- Each app process holds a pool of database connections. The pool saves the cost of opening a new TCP+TLS connection on every query
- But pools multiply with replicas. 50 pods × 20 connections per pod = 1,000 connections against the database

<svg viewBox="0 0 460 78" role="img" aria-label="50 pods each with a pool of 20 connections; the database sees 1,000 connections against a Postgres default of max_connections = 100" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="4" y="10" width="52" height="18" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="30" y="23" text-anchor="middle" font-size="8">pod 1 × 20</text>
  <rect x="4" y="32" width="52" height="18" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="30" y="45" text-anchor="middle" font-size="8">pod 2 × 20</text>
  <rect x="4" y="54" width="52" height="18" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="30" y="67" text-anchor="middle" font-size="8">pod 50 × 20</text>
  <text x="30" y="78" text-anchor="middle" font-size="7" fill="#6b6b6b">… × 50</text>
  <path d="M56 20 L140 36" stroke="#1a1a1a" fill="none"/><path d="M140 36 l-7 -4 v6 z" fill="#1a1a1a"/>
  <path d="M56 42 L140 40" stroke="#1a1a1a" fill="none"/><path d="M140 40 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M56 62 L140 44" stroke="#1a1a1a" fill="none"/><path d="M140 44 l-7 -1 v6 z" fill="#1a1a1a"/>
  <rect x="144" y="24" width="120" height="30" rx="3" fill="none" stroke="#b8541a"/>
  <text x="204" y="43" text-anchor="middle" font-size="9" fill="#b8541a">1,000 connections</text>
  <path d="M264 39 L300 39" stroke="#1a1a1a"/><path d="M300 39 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="304" y="24" width="110" height="30" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="359" y="37" text-anchor="middle" font-size="8">Postgres</text>
  <text x="359" y="49" text-anchor="middle" font-size="8" fill="#6b6b6b">max_connections = 100</text>
</svg>

- Postgres default `max_connections` is 100. A few of those are reserved for the superuser, so ordinary clients are refused before the 100th. The autoscaler, which was supposed to help, is the thing that pushes it over
- **Size by Little's law** (Module 3, page 6): connections needed = QPS per pod × average query time. 200 req/s × 2 ms = 0.4 connections. A pool of 5 is generous. A pool of 20 is wasted and dangerous

### The failure

- The autoscaler adds pods because CPU is high. Each pod opens 20 connections. At 50 pods the database says "too many connections." New pods fail health checks, the autoscaler adds more, each adding 20 more refused connections
- A **connection pooler** such as PgBouncer, a small proxy that speaks the Postgres protocol, sits between the pods and the database, multiplexing thousands of app connections into a small fixed set of database connections
