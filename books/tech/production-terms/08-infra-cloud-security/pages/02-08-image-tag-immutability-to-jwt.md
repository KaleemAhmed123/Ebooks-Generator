## Image Tag Immutability

`latest` is a name, not a version. Two deploys of the same tag can be running
different code.

A pod restarts and pulls a newer `latest` than its siblings. Two builds now
serve traffic and the manifest insists they are the same thing. Rollback becomes
an argument about what was actually running.

| Tag | What is running |
|---|---|
| `app:latest` | pod A build 412, pod B build 418 |
| `app:sha-9f2c1b` | one build, everywhere, reproducible |

## JWT

*JSON Web Token*

A signed, self-contained token. The server verifies the signature and reads the
claims with no database lookup — the whole feature, and the exact reason you
cannot revoke one.

Ban a user holding a 24-hour token and they keep their access for 24 hours.
There is no list to remove them from, because the design's point was that there
is no list. Short expiry, a refresh token, and a denylist is the practical
answer, and it gives back the lookup you were avoiding.

Signed is not encrypted. The payload is base64url and readable by anyone
carrying the token, so nothing secret goes in it.
