### The parts that make it work

- **`-p pr-123` gives each preview its own compose project**, so networks, containers and volumes never collide
- **A wildcard DNS record and certificate** for `*.preview.example.com`, so no DNS change is needed per branch. Traefik or Caddy routes by hostname automatically
- **Teardown on close is not optional.** Without it the box accumulates stacks until it runs out of memory

### The three constraints

- **Each preview needs its own database.** A shared one means one branch's migration breaks every other preview
- **Seed, never copy production data.** Twenty previews holding customer data is twenty times the exposure
- **Put a lifetime on them.** Destroy anything older than seven days, whether the pull request is closed or not
