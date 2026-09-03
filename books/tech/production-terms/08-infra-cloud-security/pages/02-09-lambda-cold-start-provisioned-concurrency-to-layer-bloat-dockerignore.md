## Lambda Cold Start & Provisioned Concurrency

An idle Lambda environment is frozen. The next request pays to initialise the
runtime, load dependencies and construct the handler before your code runs at
all.

Six seconds of that on a user-facing endpoint is not a latency problem, it is an
outage the dashboard files under p99. Provisioned concurrency keeps N
environments warm and answers in about 40ms.

You are billed for provisioned concurrency by the hour whether traffic arrives
or not. It is a floor under the bill bought with a ceiling on the latency.

| Path | Time to first byte | Billed |
|---|---|---|
| cold start | ~6s | per request |
| provisioned, warm | ~40ms | hourly, traffic or not |

## Layer Bloat & .dockerignore

Deleting a file in a later layer does not remove it from the image. The earlier
layer still carries the bytes; the newer one only hides them.

`RUN wget big.tar`, `RUN tar -xf big.tar`, `RUN rm big.tar` as three
instructions ships a 400MB tarball you cannot see in the final filesystem.
Chained into one `RUN`, the file never reaches a committed layer.

The other half is `.dockerignore`. Without it, `COPY . .` sweeps `node_modules`,
`.git` and any stray `.env` into the build context and usually into the image.
