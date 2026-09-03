## Access Token vs Refresh Token

Two tokens with different jobs. The access token is short-lived and sent on
every request; the refresh token is long-lived, stored more carefully, and does
nothing except mint new access tokens.

Fifteen minutes is the usual access lifetime, which makes a leaked one nearly
worthless. The refresh token lives thirty days in an `HttpOnly` cookie and
rotates on every use.

Rotation is the half people skip. If an old refresh token is presented a second
time, that whole token family is compromised — the correct response is to revoke
every token in it, not to quietly issue another one.

## Auto Scaling Group

A group that keeps a target number of instances alive against a metric. CPU is
the default metric and the wrong signal for most workloads.

An I/O-bound API sits at 25% CPU while its queue backs up behind it. The
autoscaler sees a quiet fleet, does nothing, and latency climbs with the CPU
graph flat.

Scale out fast and in slow. Symmetric thresholds make the group oscillate,
removing the capacity it added ninety seconds ago.

| Signal | Fits |
|---|---|
| CPU 70% | compute-bound work only |
| requests per target | HTTP APIs |
| queue depth or message age | workers |
