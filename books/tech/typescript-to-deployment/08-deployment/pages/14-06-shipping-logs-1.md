## Getting logs off the machine

- The application writes JSON to stdout. **Something else has to collect it, or it dies with the container**

| Approach | How | Fits |
|---|---|---|
| **container log driver** | Docker writes to a file or a service | the simplest, and the default |
| **an agent reading the files** | Alloy, Promtail, Fluent Bit | **the flexible answer** |
| **the app ships directly** | a Winston transport | avoid. It couples the app to the destination |
| **a sidecar** | one collector per service | Kubernetes, mostly |
