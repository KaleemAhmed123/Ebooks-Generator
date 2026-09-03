## Health Check vs Readiness

Liveness asks whether to restart the process. Readiness asks whether to send it
traffic. Different questions, and the probes must not share an implementation.

A liveness probe that checks the database restarts every pod the moment the
database is briefly slow. A blip becomes a full outage, and the restart storm
makes the database slower still.

Liveness must never touch an external dependency. Only readiness may.

| Probe | Question | Failing means |
|---|---|---|
| startup | still booting? | wait, do not kill it |
| liveness | process wedged? | restart the container |
| readiness | dependencies up? | pull it out of the pool |

## HTTP Keep-Alive to Upstream

Nginx opens a fresh TCP connection to the backend for every proxied request
unless the upstream block is given a keepalive pool.

Three lines close that gap: `keepalive 64` inside `upstream`,
`proxy_http_version 1.1`, and `proxy_set_header Connection ""`. Together they
removed 12ms of connection setup from every single request.

The third line is the one people forget. Without it Nginx forwards
`Connection: close`, the backend hangs up after each response, and the pool
exists while never being reused.
