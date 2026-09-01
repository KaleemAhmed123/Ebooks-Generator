### Scope the API token

- The token needs `Zone:DNS:Edit` on that one zone and nothing else. A full-account token on the server is a way to lose the domain along with the box

### When DNS-01 is the right choice anyway

- Port 80 is not reachable, because the box sits behind a network that blocks it
- Many subdomains, each of which would otherwise need its own HTTP validation
- A certificate is needed before the service is publicly reachable at all
