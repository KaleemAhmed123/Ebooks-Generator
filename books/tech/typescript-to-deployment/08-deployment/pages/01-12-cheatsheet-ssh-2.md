### Tunnels

```bash
ssh -L 5433:db.internal:5432 prod       # local 5433 reaches the private database
ssh -L 3000:localhost:3000 prod         # see a service that only listens on loopback
ssh -N -f -L 5433:db.internal:5432 prod # background, no shell
```

- **A tunnel is how you reach a private database from a laptop** without opening a port to the internet
