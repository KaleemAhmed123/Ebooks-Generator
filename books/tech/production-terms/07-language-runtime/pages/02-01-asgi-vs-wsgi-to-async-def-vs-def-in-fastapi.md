## ASGI vs WSGI

WSGI serves one request per worker thread and understands nothing but request
and response. ASGI is async and adds WebSockets, server-sent events and lifespan
hooks. Flask and classic Django are WSGI; FastAPI and Starlette are ASGI.

Two hundred open SSE streams under WSGI needs two hundred workers, each parked
holding a socket. Under ASGI the same two hundred sit on one event loop.

The two are bridged in production by `gunicorn -k uvicorn.workers.UvicornWorker`
— gunicorn supervises the processes, uvicorn runs the loop inside each one.

## async def vs def in FastAPI

`async def` puts the handler on the event loop. Plain `def` hands it to a
threadpool. Choosing wrong never raises anything — it just stops the server
serving anybody else.

A `requests.get()` inside an `async def` endpoint holds the loop for 800ms.
Every other in-flight request waits that out. The identical call inside a plain
`def` endpoint is harmless, because the threadpool absorbs it.

| Handler | Call inside | Result |
|---|---|---|
| `async def` | `await httpx.get(...)` | concurrent |
| `async def` | `requests.get(...)` | blocks every request |
| `def` | `requests.get(...)` | threadpool, safe |

Blocking library, plain `def`. Async library, `async def`. The one combination
that costs you the server is the one that looks most modern.
