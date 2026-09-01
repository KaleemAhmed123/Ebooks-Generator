### Sessions or JWT

| | Session cookie | JWT |
|---|---|---|
| State | server side | in the token |
| Revoke now | delete the row | needs a blocklist |
| Scales to many services | needs a shared store | verify anywhere |
| Size on each request | an id | the whole payload |

- Sessions when it is your own browser client and instant logout matters
- JWT when other services or mobile clients need to verify without calling you
