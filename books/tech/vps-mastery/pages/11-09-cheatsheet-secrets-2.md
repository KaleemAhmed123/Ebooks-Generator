### The checklist

- [ ] `.env` is `600` and ignored by Git
- [ ] `.env.example` is committed, with empty values
- [ ] No secret in any `ARG`, checked with `docker history`
- [ ] Missing required variables stop the process at startup
- [ ] Logging redacts `password`, `token`, `authorization`, `secret`
- [ ] An encrypted copy of `.env` exists off the box
- [ ] The age private key is in a password manager, not on the server
- [ ] GitHub push protection and secret scanning are on
- [ ] The deploy key is repository-scoped and read-only
