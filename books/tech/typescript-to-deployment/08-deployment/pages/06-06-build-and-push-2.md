### The rules

- **Tag with the commit SHA, always.** `latest` is a convenience for humans and must never be what a deployment references
- **`needs: check`** makes the build wait for tests, so a failing test cannot produce a deployable image
- **Build once.** The same image goes to staging and then to production. Rebuilding for production means production runs bytes nobody tested
- `outputs` passes the image reference to the deploy job, so the tag is decided in one place
