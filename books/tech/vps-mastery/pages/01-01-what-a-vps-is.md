## What a VPS is

- A **VPS** (Virtual Private Server) is a slice of a physical machine in a data center, rented by the month
- The provider runs a hypervisor. It carves one large machine into many isolated virtual ones. Each gets its own kernel, its own disk, and its own IP address
- What arrives is an empty Linux install and a way to log in. No web server, no database, no runtime

| Included | Not included |
|---|---|
| Root access | Anything installed for you |
| A public IPv4 address | A domain name |
| A fixed amount of CPU, RAM, disk | Automatic scaling |
| A reboot button in a web panel | Backups, unless bought separately |

### The one sentence that matters

- Everything on the box is your responsibility, including the parts that fail at 3am

### Terms used from here on

- **Host** - the VPS itself, the Ubuntu machine
- **Container** - an isolated process tree running on the host, packaged with its own filesystem
- **Image** - the read-only template a container is started from
- **Upstream** - a backend that a proxy forwards requests to
