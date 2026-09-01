### The scope rule that catches everyone

- **An `ARG` declared before the first `FROM` is not visible after it.** It has to be redeclared inside each stage that needs it

```dockerfile
ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-slim AS build
ARG NODE_VERSION                  # redeclared, now usable in this stage
RUN echo "built on ${NODE_VERSION}"
```
