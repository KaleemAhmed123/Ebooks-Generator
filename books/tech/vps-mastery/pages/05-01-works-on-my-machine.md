## The problem containers solve

- Code that runs on a laptop and fails on the server usually differs in one of five ways

| Difference | Failure it produces |
|---|---|
| Node version | Syntax error on a feature the older runtime lacks |
| Operating system | A native module compiled for macOS, running on Linux |
| Installed system libraries | `libvips` missing, so image resizing throws at runtime |
| Environment variables | Works locally because a value was exported once, months ago |
| Filesystem case sensitivity | `import { Order } from "./order"` resolves on macOS, fails on Linux |

### What a container fixes

- A **container** packages the application together with its runtime, its system libraries, and its filesystem layout
- The same image runs identically on a laptop, in a CI job, and on the server, because the only thing borrowed from the host is the kernel

### What a container does not fix

- Configuration. Environment variables still come from outside, and still differ per environment
- Data. A database is state, and state is the subject of Module 12
- Architecture. An image built for `arm64` on an Apple laptop will not start on an `amd64` server. Page 05-16 covers that

### The trade

- One more layer to understand, in exchange for the deployment step becoming the same command everywhere
