## The Figma problem

- Figma is a browser-based design tool. Unlike a standard web application, users don't fill out a form and click "Submit". They drag rectangles, change colors, and edit vectors at 60 frames per second on a WebGL canvas, while ten other designers are editing the exact same file

| | Standard Web App | Figma |
|---|---|---|
| **Write Frequency** | 1 per minute (filling a form). | 60 per second (dragging a mouse). |
| **State Location** | Kept in the database. | Kept entirely in RAM. |
| **Concurrency** | One user per row. | Dozens of users per file. |
| **Latency Tolerance** | 200ms (HTTP request). | 16ms (1 frame at 60fps). |

- If Figma was built like a standard REST API, every time you moved your mouse 1 pixel, the browser would send an HTTP `PATCH` request to a Postgres database, acquire a row lock, write the new X/Y coordinates, and return 200 OK. The latency would make the tool completely unusable, and the database would instantly crash from the load
- To solve this, Figma had to completely abandon traditional database transactions and build a bespoke synchronization engine

### The failure

- Treating real-time collaborative editing as a standard CRUD REST API. If you try to build a multiplayer whiteboard by writing `UPDATE elements SET x = 10` on every mouse move, you will destroy your database in minutes. Real-time apps require a completely different architecture
