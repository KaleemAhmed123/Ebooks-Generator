### Why a backend developer should care

- A dependency you never audited runs with your process's full access to disk and network
- A build step that only needs to read `src` and write `dist` can be locked to exactly that
- It will not stop a determined attacker, and it does raise the cost of a supply chain compromise

- Start with build and CI scripts, where the allowed paths are obvious and small
