### Sizing the first box

| Running | Memory |
|---|---|
| the app alone | 1 to 2 GB |
| app + Postgres + Redis | **4 GB** |
| the above + monitoring stack | **8 GB** |
| the above + CI runner and self-hosted tools | 16 GB |

- **Start at 4 GB and resize when a metric says to.** Every provider resizes in place with a reboot
- **Take the image as Ubuntu LTS.** Everything in this module assumes it, and Debian stable needs only trivial changes
